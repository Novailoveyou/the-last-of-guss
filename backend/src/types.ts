import type { options } from './utils.js'

export type Envs = typeof options.schema extends { properties: infer P }
  ? {
      [K in keyof P]: P[K] extends { type: 'string' }
        ? string
        : P[K] extends { type: 'number' }
        ? number
        : P[K] extends { type: 'boolean' }
        ? boolean
        : unknown
    }
  : never
