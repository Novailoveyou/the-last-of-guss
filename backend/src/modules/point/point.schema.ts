import type { FastifySchema } from 'fastify'

/** @todo add responses schemas */
const pointSchema = {
  get: {
    querystring: {
      type: 'object',
      required: ['roundId'],
      properties: {
        roundId: { type: 'string' },
      },
    },
  },
  post: {
    body: {
      type: 'object',
      required: ['roundId'],
      properties: {
        roundId: { type: 'string' },
      },
    },
  },
  patch: {
    body: {
      type: 'object',
      required: ['roundId', 'value'],
      properties: {
        roundId: { type: 'string' },
        value: { type: 'number' },
      },
    },
  },
} as const satisfies {
  get: FastifySchema
  post: FastifySchema
  patch: FastifySchema
}

export default pointSchema
