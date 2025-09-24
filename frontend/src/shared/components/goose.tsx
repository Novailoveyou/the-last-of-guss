import { useStore } from '@/app/store'
import { cn } from '../lib/utils'
import { usePatchPoint } from '@/entities/point/hooks'

type GooseProps = {
  disabled: boolean
  roundId: string
}
export const Goose = ({ disabled, roundId }: GooseProps) => {
  const { patchTriggerPoint } = usePatchPoint()
  const addPoint = useStore(state => state.point.addPoint)
  const points = useStore(state => state.point.points)

  const handleClick = async () => {
    if (disabled) return
    addPoint()
    await patchTriggerPoint({ roundId, value: points })
  }

  return (
    <a
      className='max-w-96 active:scale-95'
      aria-label='Гусь'
      role='button'
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}>
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Goose.svg/916px-Goose.svg.png'
        alt='Гусь'
        className={cn(
          'dark:brightness-0 dark:invert cursor-pointer filter dark:contrast-100',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
      />
    </a>
  )
}
