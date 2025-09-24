import { useToken } from '@/entities/survivor/hooks'
import { View } from '@/shared/components/view'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'

export function RoundView() {
  const { token } = useToken()
  const params = useParams()
  const navigate = useNavigate()

  const id = params.id

  useEffect(() => {
    if (!id) navigate('/rounds')
  }, [id, navigate])

  useEffect(() => {
    if (!token) navigate('/login')
  }, [token, navigate])

  return <View>Round</View>
}
