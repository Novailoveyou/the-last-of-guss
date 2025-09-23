import type { FastifySchema } from 'fastify'

/** @todo add responses schemas */
const roundSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
} as const satisfies FastifySchema

export default roundSchema
