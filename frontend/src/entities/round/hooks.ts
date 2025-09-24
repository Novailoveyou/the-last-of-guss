'use client'

import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { roundsFetcher, createRoundFetcher, roundFetcher } from './api'
import { ROUND_KEY } from './constants'
import { useStore } from '@/app/store'

export const useRounds = () => {
  const setRounds = useStore(state => state.round.setRounds)

  const {
    data: rounds = null,
    error: roundsError,
    isLoading: roundsAreLoading,
    isValidating: roundsAreValidating,
    mutate: mutateRounds,
  } = useSWR(ROUND_KEY, roundsFetcher, {
    onSuccess: setRounds,
    refreshInterval: 1000,
  })

  return {
    rounds,
    roundsError,
    roundsAreLoading,
    roundsAreValidating,
    mutateRounds,
  }
}

export const useCreateRound = () => {
  const addRound = useStore(state => state.round.addRound)

  const {
    data: round = null,
    error: roundError,
    isMutating: roundIsMutating,
    reset: resetRound,
    trigger: triggerRound,
  } = useSWRMutation(ROUND_KEY, createRoundFetcher, {
    onSuccess: addRound,
  })

  return {
    round,
    roundError,
    roundIsMutating,
    resetRound,
    triggerRound,
  }
}

export const useRound = (id?: string) => {
  const setRound = useStore(state => state.round.setRound)

  const {
    data: round = null,
    error: roundError,
    isLoading: roundIsLoading,
    isValidating: roundIsValidating,
    mutate: mutateRound,
  } = useSWR(id ? `${ROUND_KEY}/${id}` : null, roundFetcher, {
    onSuccess: setRound,
  })

  return {
    round,
    roundError,
    roundIsLoading,
    roundIsValidating,
    mutateRound,
  }
}
