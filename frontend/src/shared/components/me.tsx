import { useMe, useToken } from '@/entities/survivor/hooks'
import { Skeleton } from './ui/skeleton'

export const Me = () => {
  const { token } = useToken()
  const { me, meIsLoading } = useMe()
  if (!token || !me) return null

  return (
    <span className='ml-auto'>
      {(meIsLoading && <Skeleton className='w-12 h-6' />) || me.login}
    </span>
  )
}
