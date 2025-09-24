import z from 'zod'
import { SurvivorModel } from '../../../../docs/generated/zod/survivor'

export const formSchema = z.object({
  login: SurvivorModel.shape.login,
  password: SurvivorModel.shape.password,
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
