import { createSlice } from '@/app/store/utils'
import type { PointStore } from './model'

export const pointSlice = createSlice<PointStore>(set => ({
  point: {
    points: 0,
    multiplier: 0,
    addPoint: () =>
      set(state => {
        state.point.multiplier += 1

        if (state.point.multiplier === 11) {
          state.point.points += 10
          state.point.multiplier = 0
        } else {
          state.point.points += 1
        }
      }),
    setPoints: (points: number) =>
      set(state => {
        state.point.points = points
      }),
  },
}))
