'use client'

import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { pointsFetcher, createPointsFetcher, patchPointsFetcher } from './api'
import { POINT_KEY } from './constants'
import { useStore } from '@/app/store'

export const usePoints = (roundId?: string) => {
  const {
    data: points = null,
    error: pointsError,
    isLoading: pointsAreLoading,
    isValidating: pointsAreValidating,
    mutate: mutatePoints,
  } = useSWR(
    roundId ? `${POINT_KEY}?roundId="${roundId}"` : null,
    pointsFetcher,
    {
      refreshInterval: 1000,
    },
  )

  return {
    points,
    pointsError,
    pointsAreLoading,
    pointsAreValidating,
    mutatePoints,
  }
}

export const useCreatePoint = () => {
  const setPoints = useStore(state => state.point.setPoints)

  const {
    data: createdPoint = null,
    error: createPointError,
    isMutating: createPointIsMutating,
    reset: createResetPoint,
    trigger: createTriggerPoint,
  } = useSWRMutation(POINT_KEY, createPointsFetcher, {
    onSuccess: data => {
      setPoints(data.value)
    },
  })

  return {
    createdPoint,
    createPointError,
    createPointIsMutating,
    createResetPoint,
    createTriggerPoint,
  }
}

export const usePatchPoint = () => {
  const setPoints = useStore(state => state.point.setPoints)

  const {
    data: patchedPoint = null,
    error: patchePointError,
    isMutating: patchePointIsMutating,
    reset: patchResetPoint,
    trigger: patchTriggerPoint,
  } = useSWRMutation(POINT_KEY, patchPointsFetcher, {
    onSuccess: data => {
      setPoints(data.value)
    },
  })

  return {
    patchedPoint,
    patchePointError,
    patchePointIsMutating,
    patchResetPoint,
    patchTriggerPoint,
  }
}
