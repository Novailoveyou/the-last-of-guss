import fastify from 'fastify'
import type { FastifySchema } from 'fastify'
import fastifyEnv from '@fastify/env'
import { options } from './utils.js'
import type { Envs } from './types.js'
import type { FromSchema } from 'json-schema-to-ts'
import { PrismaClient } from '../dist/generated/prisma/client.js'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = fastify({
  logger: true,
})

await app.register(fastifyEnv, options)
const envs = app.getEnvs<Envs>()

const prisma = new PrismaClient().$extends(withAccelerate())

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

/**
 * @description Login endpoint
 */
app.route<{
  Body: FromSchema<typeof survivorSchema.body>
}>({
  method: 'POST',
  url: '/login',
  schema: survivorSchema,
  handler: async (request, reply) => {
    const { login, password } = request.body

    const survivor = await prisma.survivor.findUnique({
      where: {
        login_password: {
          login,
          password,
        },
      },
    })

    if (survivor) return reply.code(200).send(survivor)

    const createdSurvivor = await prisma.survivor.create({
      data: {
        login,
        password,
      },
    })

    return reply.code(201).send(createdSurvivor)
  },
})

const roundSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
} as const satisfies FastifySchema

/**
 * @description Get all rounds
 */
app.get('/rounds', async (request, reply) => {
  const rounds = await prisma.round.findMany()

  return reply.code(200).send(rounds)
})

/**
 * @description Create a new round
 */
app.post('/rounds', async (request, reply) => {
  const newRound = await prisma.round.create({
    data: {},
  })

  return reply.code(201).send(newRound)
})

/**
 * @description Get a specific round by ID
 */
app.get<{ Params: FromSchema<typeof roundSchema.params> }>(
  '/rounds/:id',
  {
    schema: roundSchema,
  },
  async (request, reply) => {
    const { id } = request.params
    const round = await prisma.round.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        points: {
          select: {
            value: true,
            survivorId: true,
          },
        },
      },
    })

    if (!round) return reply.code(404).send({ error: 'Раунд не найден' })

    return reply.code(200).send(round)
  },
)

const pointSchema = {
  get: {
    querystring: {
      type: 'object',
      required: ['survivorId', 'roundId'],
      properties: {
        roundId: { type: 'string' },
        survivorId: { type: 'string' },
      },
    },
  },
  post: {
    body: {
      type: 'object',
      required: ['survivorId', 'roundId'],
      properties: {
        roundId: { type: 'string' },
        survivorId: { type: 'string' },
      },
    },
  },
  patch: {
    body: {
      type: 'object',
      required: ['survivorId', 'roundId', 'value'],
      properties: {
        roundId: { type: 'string' },
        survivorId: { type: 'string' },
        value: { type: 'number' },
      },
    },
  },
} as const satisfies {
  get: FastifySchema
  post: FastifySchema
  patch: FastifySchema
}

/**
 * @description Get points for a specific survivor in a specific round
 */
app.get<{ Querystring: FromSchema<typeof pointSchema.get.querystring> }>(
  '/points',
  {
    schema: pointSchema.get,
  },
  async (request, reply) => {
    const { survivorId, roundId } = request.query

    const point = await prisma.point.findUnique({
      where: {
        roundId_survivorId: {
          roundId,
          survivorId,
        },
      },
    })

    if (!point) return reply.code(404).send({ error: 'Очки не найдены' })

    return reply.code(200).send(point!)
  },
)

/**
 * @description Create points for a specific survivor in a specific round
 */
app.post<{ Body: FromSchema<typeof pointSchema.post.body> }>(
  '/points',
  {
    schema: pointSchema.post,
  },
  async (request, reply) => {
    const { survivorId, roundId } = request.body

    const point = await prisma.point.create({
      data: {
        survivorId,
        roundId,
      },
    })

    if (!point)
      return reply.code(400).send({ error: 'Не удалось создать очки' })

    return reply.code(201).send(point!)
  },
)

/**
 * @description Update points for a specific survivor in a specific round
 */
app.patch<{ Body: FromSchema<typeof pointSchema.patch.body> }>(
  '/points',
  {
    schema: pointSchema.patch,
  },
  async (request, reply) => {
    const { survivorId, roundId, value } = request.body

    const point = await prisma.point.findUnique({
      where: {
        roundId_survivorId: {
          roundId,
          survivorId,
        },
      },
    })

    if (!point) return reply.code(404).send({ error: 'Очки не найдены' })

    if (value <= point!.value)
      return reply.code(400).send({ error: 'Очки могут только увеличиваться' })

    const survivor = await prisma.survivor.findUnique({
      where: { id: survivorId },
    })

    // TODO: finish conditions
    if (survivor?.login?.trim().toLocaleLowerCase() === 'nikita')
      return reply.code(403).send({ error: 'Никита не может менять свои очки' })

    const updatedPoint = await prisma.point.update({
      where: {
        id: point!.id,
      },
      data: {
        value,
      },
    })

    if (!updatedPoint)
      return reply.code(400).send({ error: 'Не удалось обновить очки' })

    return reply.code(200).send(updatedPoint!)
  },
)

await app.listen({ port: envs.PORT }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`Server listening at ${address}`)
})
