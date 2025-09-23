import fp from 'fastify-plugin'
import type { FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '../../dist/generated/prisma/client.js'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (server, options) => {
  const prisma = new PrismaClient()

  await prisma.$connect()

  server.decorate('prisma', prisma)

  server.addHook('onClose', async server => {
    await server.prisma.$disconnect()
  })
})

export default prismaPlugin
