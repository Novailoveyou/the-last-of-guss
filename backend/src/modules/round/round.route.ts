import type { FastifyPluginCallback } from 'fastify'
import type { FromSchema } from 'json-schema-to-ts'
import roundSchema from './round.schema.js'

const roundController: FastifyPluginCallback = (app, options, done) => {
  /**
   * @description Get all rounds
   */
  app.get(
    '/',
    {
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const rounds = await app.prisma.round.findMany({
        select: {
          id: true,
          startAt: true,
          endAt: true,
        },
        orderBy: {
          startAt: 'desc',
        },
      })

      return reply.code(200).send(rounds)
    },
  )

  /**
   * @description Create a new round
   */
  app.post(
    '/',
    {
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      if (request.user.login !== 'admin') {
        return reply.code(403).send({ error: 'Доступ запрещен' })
      }

      const now = new Date()
      const startAtTime =
        now.getTime() + app.getTypedEnvs().COOLDOWN_DURATION_SEC * 1000
      const endAtTime =
        startAtTime + app.getTypedEnvs().ROUND_DURATION_SEC * 1000

      const newRound = await app.prisma.round.create({
        data: {
          startAt: new Date(startAtTime),
          endAt: new Date(endAtTime),
        },
        select: {
          id: true,
          startAt: true,
          endAt: true,
        },
      })

      return reply.code(201).send(newRound)
    },
  )

  /**
   * @description Get a specific round by ID
   */
  app.get<{ Params: FromSchema<typeof roundSchema.params> }>(
    '/:id',
    {
      schema: roundSchema,
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { id } = request.params
      const round = await app.prisma.round.findUnique({
        where: { id },
        select: {
          id: true,
          startAt: true,
          endAt: true,
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

  done()
}

export default roundController
