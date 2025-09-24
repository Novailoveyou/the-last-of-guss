import api from '@/shared/lib/api'
import { getCookie } from 'react-use-cookie'
import type { RoundStore } from './model'

export const roundsFetcher = async (key: string) => {
  const response = await api.get<RoundStore['round']['rounds']>(key, {
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })

  return response.data
}

export const createRoundFetcher = async (key: string) => {
  const response = await api.post<RoundStore['round']['rounds'][number]>(
    key,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    },
  )

  return response.data
}

export const roundFetcher = async (key: string) => {
  const response = await api.get<RoundStore['round']['round']>(key, {
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })

  return response.data
}
