import { useIsAdmin } from '@/entities/survivor/hooks'
import { useCreateRound, useRound, useRounds } from './hooks'
import { P } from '@/shared/components/typography'
import { Button } from '@/shared/components/ui/button'
import { Link, useNavigate } from 'react-router'
import { getStatus } from './utils'
import { cn } from '@/shared/lib/utils'
import { Loader } from 'lucide-react'
import { Goose } from '@/shared/components/goose'
import { useEffect } from 'react'

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
  const { roundIsLoading, round } = useRound(id)
  const navigate = useNavigate()

  useEffect(() => {
    if (!round && !roundIsLoading) navigate('/')
  }, [round, roundIsLoading, navigate])

  if (!round) return null

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <P>Статус: {getStatus(round.startAt, round.endAt).label}</P>
      <Goose />
    </div>
  )
}
