import type { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt'
import type { Envs } from '../types.js'

declare module 'fastify' {
	interface FastifyInstance {
		authenticate: (
			request: FastifyRequest,
			reply: FastifyReply,
		) => Promise<void>
	}
}

declare module '@fastify/jwt' {
	interface FastifyJWT {
		user: {
			id: string
			login: string
		}
	}
}

const jwtPlugin: FastifyPluginAsync = fp(async (app, options) => {
	app.register(fastifyJwt, {
		secret: app.getEnvs<Envs>().JWT_SECRET,
		sign: {
			expiresIn: '1d',
		},
	})

	app.decorate('authenticate', async (request, reply) => {
		try {
			await request.jwtVerify()

			const token = app.jwt.lookupToken(request)

			const survivor = await app.prisma.survivor.findUnique({
				where: {
					jwt: token,
				},
			})

			if (!survivor || survivor.jwt !== token)
				return reply.code(401).send({ error: 'Invalid token' })
		} catch (err) {
			return reply.send(err)
		}
	})
})

export default jwtPlugin
