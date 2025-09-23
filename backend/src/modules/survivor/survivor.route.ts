import type { FastifyPluginCallback } from 'fastify'
import type { FromSchema } from 'json-schema-to-ts'
import survivorSchema from './survivor.schema.js'

const survivorController: FastifyPluginCallback = (app, options, done) => {
	/**
	 * @description Login or register a survivor
	 */
	app.post<{
		Body: FromSchema<typeof survivorSchema.body>
	}>(
		'/login',
		{
			schema: survivorSchema,
		},
		async (request, reply) => {
			const { login, password: rawPassword } = request.body

			const password = await app.bcrypt.hash(rawPassword)

			const existingSurvivor = await app.prisma.survivor.findUnique({
				where: {
					login,
				},
			})

			if (
				existingSurvivor &&
				!(await app.bcrypt.compare(rawPassword, existingSurvivor.password))
			)
				return reply.code(401).send({ error: 'Неверный пароль' })

			const survivor =
				existingSurvivor ||
				(await app.prisma.survivor.create({
					data: {
						login,
						password,
					},
				}))

			const token = await reply.jwtSign({
				id: survivor.id,
				login: survivor.login,
			} as const satisfies typeof request.user)

			await app.prisma.survivor.update({
				where: { id: survivor.id },
				data: { jwt: token },
			})

			return reply.code(existingSurvivor ? 200 : 201).send({ token })
		},
	)

	app.delete(
		'/logout',
		{ onRequest: [app.authenticate] },
		async (request, reply) => {
			reply.clearCookie('token', { path: '/' })

			await app.prisma.survivor.update({
				where: { id: request.user.id },
				data: { jwt: null },
			})

			return reply.code(200).send({ message: 'Logged out' })
		},
	)

	done()
}

export default survivorController
