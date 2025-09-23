import type { FastifySchema } from 'fastify'

/** @todo add responses schemas */
const survivorSchema = {
	body: {
		type: 'object',
		required: ['login', 'password'],
		properties: {
			login: { type: 'string' },
			password: { type: 'string' },
		},
	},
} as const satisfies FastifySchema

export default survivorSchema
