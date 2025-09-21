import type { FastifyEnvOptions } from '@fastify/env'

export const options = {
  dotenv: true,
  schema: {
    type: 'object',
    required: ['PORT'],
    properties: {
      PORT: { type: 'number', default: 1337 },
      ROUND_DURATION_SEC: {
        type: 'number',
        default: 60,
      },
      COOLDOWN_DURATION_SEC: {
        type: 'number',
        default: 30,
      },
    },
  },
} as const satisfies FastifyEnvOptions
