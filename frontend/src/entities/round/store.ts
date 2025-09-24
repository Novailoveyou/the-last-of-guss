import { createSlice } from '@/app/store/utils'
import type { RoundStore } from './model'

export const roundSlice = createSlice<RoundStore>(set => ({
  round: {
    rounds: [],
    setRounds: rounds =>
      set(state => {
        state.round.rounds = rounds
      }),
    addRound: round =>
      set(state => {
        state.round.rounds.unshift(round)
      }),
    round: null,
    setRound: round =>
      set(state => {
        state.round.round = round
      }),
  },
}))
