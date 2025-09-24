import type { StateCreator } from 'zustand/vanilla'
import type { SurvivorStore } from '@/entities/survivor/model'

export type Store = SurvivorStore

type ZustandMiddleware = [['zustand/devtools', never], ['zustand/immer', never]]

export type Slice<T> = StateCreator<Store, ZustandMiddleware, [], T>
