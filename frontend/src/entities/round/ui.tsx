import { useIsAdmin } from '@/entities/survivor/hooks'
import { useCreateRound, useRound, useRounds } from './hooks'
import { P } from '@/shared/components/typography'
import { Button } from '@/shared/components/ui/button'
import { Link, useNavigate } from 'react-router'
import { getStatus } from './utils'
import { cn } from '@/shared/lib/utils'
import { Loader } from 'lucide-react'
import { Goose } from '@/shared/components/goose'
import { useEffect, useState } from 'react'
import { useStore } from '@/app/store'

export const Rounds = () => {
  const { rounds, roundsAreLoading } = useRounds()
  const { roundIsMutating, triggerRound } = useCreateRound()
  const isAdmin = useIsAdmin()

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      {!rounds?.length && (
        <P className='text-center'>
          {roundsAreLoading ? (
            <P>Раунды загружаются...</P>
          ) : (
            <>
              Раундов пока нет
              {isAdmin ? '. Но вы можете создать новый раунд' : ''}
            </>
          )}
        </P>
      )}
      {isAdmin && (
        <Button disabled={roundIsMutating} onClick={() => triggerRound()}>
          Создать раунд {roundIsMutating && <Loader />}
        </Button>
      )}
      <ul className='flex flex-col flex-wrap justify-center items-center gap-4 m-0 p-0'>
        {rounds?.map(({ id, startAt, endAt }) => (
          <li
            key={id}
            className={cn(
              'flex flex-col flex-wrap justify-center items-center shadow-2xl rounded-2xl max-w-max',
              getStatus(startAt, endAt).status !== 'ongoing' && 'opacity-75',
              getStatus(startAt, endAt).status === 'ongoing' && 'scale-105',
            )}>
            <Link to={`/${id}`} className='flex flex-col gap-4 p-5'>
              <span>Раунд ID: {id}</span>
              <span className='flex flex-col gap-1'>
                <span>Начало: {new Date(startAt).toLocaleString()}</span>
                <span>Конец: {new Date(endAt).toLocaleString()}</span>
              </span>
              <span>Статус: {getStatus(startAt, endAt).label} </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

type RoundProps = {
  id: string
}
export const Round = ({ id }: RoundProps) => {
  const [now, setNow] = useState(new Date())
  const { roundIsLoading, round } = useRound(id)
  const navigate = useNavigate()
  const points = useStore(state => state.point.points)

  useEffect(() => {
    if (!round && !roundIsLoading) navigate('/')
  }, [round, roundIsLoading, navigate])

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!round) return null

  const status = getStatus(round.startAt, round.endAt)

  const startAt = new Date(round.startAt)
  const endAt = new Date(round.endAt)

  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <P>Статус: {status.label}</P>
      {status.status === 'ongoing' && (
        <P>
          До конца раунда{' '}
          {new Date(endAt.getTime() - now.getTime()).toLocaleTimeString(
            'ru-RU',
            {
              second: '2-digit',
            },
          )}
          сек
        </P>
      )}
      {status.status === 'cooldown' && (
        <P>
          До начала раунда{' '}
          {new Date(startAt.getTime() - now.getTime()).toLocaleTimeString(
            'ru-RU',
            {
              second: '2-digit',
            },
          )}
          сек
        </P>
      )}
      {status.status === 'ended' && (
        <>
          <P>
            Всего:{' '}
            {round.points.reduce((total, point) => total + point.value, 0)}
          </P>
          <P>
            Победитель:{' '}
            {[...round.points].sort((a, b) => b.value - a.value)[0]
              ?.survivorId || 'Никто'}
          </P>
        </>
      )}
      {(status.status === 'ongoing' || status.status === 'ended') && (
        <P>Мои очки: {points}</P>
      )}
      <Goose
        disabled={status.status === 'ended' || status.status === 'cooldown'}
        roundId={id}
      />
    </div>
  )
}
