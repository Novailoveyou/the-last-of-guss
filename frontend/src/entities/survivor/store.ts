import { createSlice } from '@/app/store/utils'
import type { SurvivorStore } from './model'

export const survivorSlice = createSlice<SurvivorStore>(set => ({
  survivor: {
    login: '',
    setLogin: login =>
      set(state => {
        state.survivor.login = login
      }),
    password: '',
    setPassword: password =>
      set(state => {
        state.survivor.password = password
      }),
  },
}))
