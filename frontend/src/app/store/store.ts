import { createStore as createZustandVanillaStore } from 'zustand/vanilla'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { Store } from './model'
import { survivorSlice } from '@/entities/survivor/store'
import { roundSlice } from '@/entities/round/store'
import { pointSlice } from '@/entities/point/store'

export const createStore = () => {
  return createZustandVanillaStore<Store>()(
    devtools(
      immer((...props) => ({
        ...survivorSlice(...props),
        ...roundSlice(...props),
        ...pointSlice(...props),
      })),
    ),
  )
}
