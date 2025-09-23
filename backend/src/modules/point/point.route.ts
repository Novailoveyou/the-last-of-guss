import type { FastifyPluginCallback } from 'fastify'
import type { FromSchema } from 'json-schema-to-ts'
import pointSchema from './point.schema.js'

const pointController: FastifyPluginCallback = (app, options, done) => {
  /**
   * @description Get points for a specific survivor in a specific round
   */
  app.get<{ Querystring: FromSchema<typeof pointSchema.get.querystring> }>(
    '/',
    {
      schema: pointSchema.get,
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { roundId } = request.query

      const survivorId = request.user.id

      const point = await app.prisma.point.findUnique({
        where: {
          roundId_survivorId: {
            roundId,
            survivorId,
          },
        },
      })

      if (!point) return reply.code(404).send({ error: 'Очки не найдены' })

      return reply.code(200).send(point)
    },
  )

  /**
   * @description Create points for a specific survivor in a specific round
   */
  app.post<{ Body: FromSchema<typeof pointSchema.post.body> }>(
    '/',
    {
      schema: pointSchema.post,
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { roundId } = request.body

      const survivorId = request.user.id

      const point = await app.prisma.point.create({
        data: {
          survivorId,
          roundId,
        },
      })

      if (!point)
        return reply.code(400).send({ error: 'Не удалось создать очки' })

      return reply.code(201).send(point)
    },
  )

  /**
   * @description Update points for a specific survivor in a specific round
   */
  app.patch<{ Body: FromSchema<typeof pointSchema.patch.body> }>(
    '/',
    {
      schema: pointSchema.patch,
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { roundId, value } = request.body

      const survivorId = request.user.id

      const now = new Date()

      const round = await app.prisma.round.findUnique({
        where: { id: roundId },
      })

      if (!round) return reply.code(404).send({ error: 'Раунд не найден' })

      if (now.getTime() < round.startAt.getTime())
        return reply.code(403).send({ error: 'Раунд еще не начался' })

      if (now.getTime() > round.endAt.getTime())
        return reply.code(403).send({ error: 'Раунд уже завершен' })

      const point = await app.prisma.point.findUnique({
        where: {
          roundId_survivorId: {
            roundId,
            survivorId,
          },
        },
      })

      if (!point) return reply.code(404).send({ error: 'Очки не найдены' })

      if (value <= point.value)
        return reply
          .code(400)
          .send({ error: 'Очки могут только увеличиваться' })

      const updatedPoint = await app.prisma.point.update({
        where: {
          id: point.id,
        },
        data: {
          value: request.user.login === 'nikita' ? 0 : value,
        },
      })

      if (!updatedPoint)
        return reply.code(400).send({ error: 'Не удалось обновить очки' })

      return reply.code(200).send(updatedPoint)
    },
  )

  done()
}

export default pointController
