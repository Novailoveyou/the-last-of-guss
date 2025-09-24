import z from 'zod'

// @TODO: apply zod schemas from the docs
export const formSchema = z.object({
  login: z
    .string()
    .trim()
    .min(1, { message: 'Логин должен быть больше 1-го символа' })
    .max(256, { message: 'Логин должен быть меньше 256-и символов' }),
  password: z
    .string()
    .trim()
    .min(5, { message: 'Пароль должен быть больше 5-и символов' })
    .max(64, { message: 'Пароль должен быть меньше 64-ех символов' }),
})

export type FormSchema = z.infer<typeof formSchema>

export type SurvivorStore = {
  survivor: {
    login: FormSchema['login']
    setLogin: (login: SurvivorStore['survivor']['login']) => void
    password: FormSchema['password']
    setPassword: (password: SurvivorStore['survivor']['password']) => void
  }
}
