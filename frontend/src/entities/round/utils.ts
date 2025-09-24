import type { RoundStore } from './model'

export const getStatus = (
  startAt: RoundStore['round']['rounds'][number]['startAt'],
  endAt: RoundStore['round']['rounds'][number]['endAt'],
) => {
  const now = new Date()
  const startDate = new Date(startAt)
  const endDate = new Date(endAt)

  if (now.getTime() < startDate.getTime())
    return {
      status: 'cooldown',
      label: 'Cooldown',
    } as const
  if (now.getTime() > endDate.getTime())
    return {
      status: 'ended',
      label: 'Завершён',
    } as const

  return { status: 'ongoing', label: 'Активен' } as const
}
