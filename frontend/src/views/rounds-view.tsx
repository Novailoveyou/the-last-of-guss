import { useToken } from '@/entities/survivor/hooks'
import { View } from '@/shared/components/view'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export function RoundsView() {
  const { token } = useToken()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) navigate('/login')
  }, [token, navigate])

  return <View>Rounds</View>
}
