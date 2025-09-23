import fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import fastifyBcrypt from 'fastify-bcrypt'
import fastifyCookie from '@fastify/cookie'
import type { Envs } from './types.js'
import { envOptions } from './utils.js'
import prismaPlugin from './plugins/prisma.js'
import jwtPlugin from './plugins/jwt.js'
import survivorController from './modules/survivor/survivor.route.js'
import roundController from './modules/round/round.route.js'
import pointController from './modules/point/point.route.js'

const app = fastify({
  logger: true,
})

await app.register(fastifyEnv, envOptions)

app.register(prismaPlugin)

/**
 * @remarks bcrypt plugin types are not working properly but the plugin works as expected
 * @see https://github.com/beliven-it/fastify-bcrypt
 * @todo fix bcrypt types
 @ts-expect-error */
app.register(fastifyBcrypt, { saltWorkFactor: 12 })

app.register(jwtPlugin)

app.register(fastifyCookie, {
  secret: app.getEnvs<Envs>().COOKIE_SECRET,
  parseOptions: {
    domain: app.getEnvs<Envs>().COOKIE_DOMAIN,
    path: '/',
    httpOnly: true,
    secure: app.getEnvs<Envs>().NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 1 day in seconds
    signed: true,
  },
})

app.get('/', async (request, reply) => {
  return reply.code(200).send({ status: 'ok' })
})

app.register(survivorController, { prefix: '/survivors' })

app.register(roundController, { prefix: '/rounds' })

app.register(pointController, { prefix: '/points' })

await app.listen(
  { host: app.getEnvs<Envs>().HOST, port: app.getEnvs<Envs>().PORT },
  (err, address) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
    app.log.info(`Server listening at ${address}`)
  },
)
