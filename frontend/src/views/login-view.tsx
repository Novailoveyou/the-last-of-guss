import { useToken } from '@/entities/survivor/hooks'
import { LoginForm } from '@/entities/survivor/ui'
import { Container } from '@/shared/components/container'
import { H1 } from '@/shared/components/typography'
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
      <section>
        <H1>Войти</H1>
        <Container>
          <LoginForm />
        </Container>
      </section>
    </View>
  )
}
