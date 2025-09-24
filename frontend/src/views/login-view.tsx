import { useToken } from '@/entities/survivor/hooks'
import { LoginForm } from '@/entities/survivor/ui'
import { View } from '@/shared/components/view'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export function LoginView() {
  const { token } = useToken()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) navigate('/')
  }, [token, navigate])

  return (
    <View>
      <LoginForm />
    </View>
  )
}
