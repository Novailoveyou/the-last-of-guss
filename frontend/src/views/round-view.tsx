import { useToken } from '@/entities/survivor/hooks'
import { Container } from '@/shared/components/container'
import { H1 } from '@/shared/components/typography'
import { View } from '@/shared/components/view'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'

export function RoundView() {
  const { token } = useToken()
  const params = useParams()
  const navigate = useNavigate()

  const id = params.id

  useEffect(() => {
    if (!id) navigate('/')
  }, [id, navigate])

  useEffect(() => {
    if (!token) navigate('/login')
  }, [token, navigate])

  return (
    <View>
      <section>
        <Container>
          <H1>Раунд</H1>
        </Container>
      </section>
    </View>
  )
}
