import api from '@/shared/lib/api'
import type { FormSchema } from './model'
import { getCookie } from 'react-use-cookie'

export const loginFetcher = async (
  key: string,
  { arg }: { arg: FormSchema },
) => {
  const response = await api.post<{ token: string }>(key, arg)

  return response.data
}

export const logoutFetcher = async (key: string) => {
  const response = await api.post<{ message: string }>(key, undefined, {
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })

  return response.data
}

export const meFetcher = async (key: string) => {
  const response = await api.get<{ id: string; login: string }>(key, {
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })

  return response.data
}
