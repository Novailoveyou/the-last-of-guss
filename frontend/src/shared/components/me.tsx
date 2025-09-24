import { useMe, useToken } from '@/entities/survivor/hooks'

export const Me = () => {
  const { token } = useToken()
  const { me } = useMe()
  if (!token || !me) return null

  return <span className='ml-auto'>{me.login}</span>
}
