import type { StateCreator } from 'zustand/vanilla'
import type { SurvivorStore } from '@/entities/survivor/model'
import type { RoundStore } from '@/entities/round/model'
import type { PointStore } from '@/entities/point/model'

export type Store = SurvivorStore & RoundStore & PointStore

type ZustandMiddleware = [['zustand/devtools', never], ['zustand/immer', never]]

export type Slice<T> = StateCreator<Store, ZustandMiddleware, [], T>
