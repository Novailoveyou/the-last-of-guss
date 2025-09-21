import fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import { options } from './utils.js'
import type { Envs, Round } from './types.js'

const server = fastify({
  logger: true,
})

await server.register(fastifyEnv, options)

const envs = server.getEnvs<Envs>()

server.post('/login', async (request, reply) => {
  return 'login\n'
})

server.get('/rounds', async (request, reply) => {
  return 'round\n'
})

server.post<{ Body: Round }>('/rounds', async (request, reply) => {
  return 'new round\n'
})

server.get<{ Params: { id: string } }>(
  '/rounds/:id',
  async (request, reply) => {
    if (!request.params.id) {
      reply.status(400)
      return 'Bad Request\n'
    }
    return `round ${request.params.id}\n`
  },
)

server.get<{ Params: { id: string } }>('/user/:id', async (request, reply) => {
  if (!request.params.id) {
    reply.status(400)
    return 'Bad Request\n'
  }
  return 'guss\n'
})

server.listen({ port: envs.PORT }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  server.log.info(`Server listening at ${address}`)
})
