import type { FastifyEnvOptions } from '@fastify/env'

export const envOptions = {
  dotenv: true,
  schema: {
    type: 'object',
    required: ['PORT'],
    properties: {
      HOST: { type: 'string', default: 'localhost' },
      PORT: { type: 'number', default: 1337 },
      ROUND_DURATION_SEC: {
        type: 'number',
        default: 60,
      },
      COOLDOWN_DURATION_SEC: {
        type: 'number',
        default: 30,
      },
      DATABASE_URL: {
        type: 'string',
      },
      JWT_SECRET: {
        type: 'string',
        default: 'supersecret',
      },
      COOKIE_SECRET: {
        type: 'string',
        default: 'supersecretcookie',
      },
      NODE_ENV: {
        type: 'string',
        default: 'development',
        enum: ['development', 'production', 'test'],
      },
      COOKIE_DOMAIN: {
        type: 'string',
        default: 'localhost',
      },
    },
  },
} as const satisfies FastifyEnvOptions
