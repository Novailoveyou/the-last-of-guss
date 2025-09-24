import { Round } from '@/entities/round/ui'
import { useToken } from '@/entities/survivor/hooks'
import { Container } from '@/shared/components/container'
import { H1 } from '@/shared/components/typography'
import { buttonVariants } from '@/shared/components/ui/button'
import { View } from '@/shared/components/view'
import { cn } from '@/shared/lib/utils'
import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router'

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
        <Container className='flex flex-col justify-center items-center'>
          <H1>Раунд</H1>
          <Link
            to='/'
            className={cn(
              buttonVariants({ variant: 'outline', className: 'mb-6' }),
            )}>
            К списку раундов
          </Link>{' '}
          {id && <Round id={id} />}
        </Container>
      </section>
    </View>
  )
}
