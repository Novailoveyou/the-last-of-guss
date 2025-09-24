import { useIsAdmin } from '@/entities/survivor/hooks'
import { useCreateRound, useRounds } from './hooks'
import { P } from '@/shared/components/typography'
import { Button } from '@/shared/components/ui/button'
import { Link } from 'react-router'
import { getStatus } from './utils'
import { cn } from '@/shared/lib/utils'
import { Loader } from 'lucide-react'

export const Rounds = () => {
  const { rounds } = useRounds()
  const { roundIsMutating, triggerRound } = useCreateRound()
  const isAdmin = useIsAdmin()

  if (!rounds?.length)
    return (
      <>
        <P>Раундов нет{isAdmin ? '. Но вы можете создать новый раунд' : ''}</P>
      </>
    )

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
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
