import { Rounds } from '@/entities/round/ui'
import { useMe, useToken } from '@/entities/survivor/hooks'
import { Container } from '@/shared/components/container'
import { H1 } from '@/shared/components/typography'
import { View } from '@/shared/components/view'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export function RoundsView() {
  const { token } = useToken()
  const navigate = useNavigate()
  useMe()

  useEffect(() => {
    if (!token) navigate('/login')
  }, [token, navigate])

  return (
    <View>
      <section>
        <Container>
          <H1>Раунды</H1>
          <Rounds />
        </Container>
      </section>
    </View>
  )
}
