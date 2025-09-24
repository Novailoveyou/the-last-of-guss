'use client'

import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import useCookie from 'react-use-cookie'
import { loginFetcher, logoutFetcher, meFetcher } from './api'
import { SURVIVOR_KEY } from './constants'
import { useNavigate } from 'react-router'
import { useStore } from '@/app/store'

export const useToken = () => {
  const [token, setToken, removeToken] = useCookie('token')

  return {
    token: token,
    setToken,
    removeToken,
  }
}

export const useLogin = () => {
  const { setToken } = useToken()
  const navigate = useNavigate()

  const {
    data: login = null,
    error: loginError,
    isMutating: loginIsMutating,
    reset: resetLogin,
    trigger: triggerLogin,
  } = useSWRMutation(`${SURVIVOR_KEY}/login`, loginFetcher, {
    onSuccess: login => {
      setToken(login.token, {
        days: 1,
        SameSite: 'Strict',
        Secure: import.meta.env.PROD,
      })

      navigate('/')
    },
  })

  return {
    login,
    loginError,
    loginIsMutating,
    resetLogin,
    triggerLogin,
  }
}

export const useLogout = () => {
  const { removeToken } = useToken()
  const navigate = useNavigate()
  const setLogin = useStore(state => state.survivor.setLogin)
  const setPassword = useStore(state => state.survivor.setPassword)

  const handleLogout = () => {
    removeToken()
    navigate('/login')
    setLogin('')
    setPassword('')
  }

  const {
    data: logout = null,
    error: logoutError,
    isMutating: logoutIsMutating,
    reset: resetLogout,
    trigger: triggerLogout,
  } = useSWRMutation(`${SURVIVOR_KEY}/logout`, logoutFetcher, {
    onSuccess: handleLogout,
    onError: handleLogout,
  })

  return {
    logout,
    logoutError,
    logoutIsMutating,
    resetLogout,
    triggerLogout,
  }
}

export const useMe = () => {
  const setLogin = useStore(state => state.survivor.setLogin)

  const {
    data: me = null,
    error: meError,
    isLoading: meIsMutating,
    isValidating: meIsValidating,
    mutate: mutatetMe,
  } = useSWR(`${SURVIVOR_KEY}/me`, meFetcher, {
    onSuccess: me => {
      setLogin(me.login)
    },
  })

  return {
    me,
    meError,
    meIsMutating,
    meIsValidating,
    mutatetMe,
  }
}

export const useIsAdmin = () => {
  const { me } = useMe()

  return me?.login === 'admin'
}
