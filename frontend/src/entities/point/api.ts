import api from '@/shared/lib/api'
import { getCookie } from 'react-use-cookie'

export const pointsFetcher = async (key: string) => {
  const response = await api.get<{
    value: number
    survivorId: string
    roundId: string
  }>(key, {
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })

  return response.data
}

export const createPointsFetcher = async (
  key: string,
  { arg }: { arg: { roundId: string } },
) => {
  const response = await api.post<{
    value: number
    survivorId: string
    roundId: string
  }>(key, arg, {
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })

  return response.data
}

export const patchPointsFetcher = async (
  key: string,
  { arg }: { arg: { roundId: string; value: number } },
) => {
  const response = await api.patch<{
    value: number
    survivorId: string
    roundId: string
  }>(key, arg, {
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })

  return response.data
}
