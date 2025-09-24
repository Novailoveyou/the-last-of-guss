import type { ComponentProps } from 'react'
import { APP_NAME } from '@/shared/constants'
import { Copyright } from './copyright'
import { ModeToggle } from './mode-toggle'
import { useLogout, useToken } from '@/entities/survivor/hooks'
import { Button } from './ui/button'
import { Loader, LogOut } from 'lucide-react'
import { Link } from 'react-router'
import { Me } from './me'
import { Container } from './container'

type ViewPropsBase = ComponentProps<'div'>

type ViewProps = Pick<ViewPropsBase, 'children'>

/**
 * @description View component to display view content
 */
export function View({ children }: ViewProps) {
  const { token } = useToken()
  const { logoutIsMutating, triggerLogout } = useLogout()

  return (
    <div className='flex flex-col gap-8 p-4 min-h-screen'>
      <header>
        <Container className='flex flex-wrap justify-start items-center gap-4'>
          <div className='flex items-center gap-2'>
            <ModeToggle />
            {token && (
              <Button
                variant='ghost'
                disabled={logoutIsMutating}
                onClick={() => triggerLogout()}>
                {logoutIsMutating ? <Loader /> : <LogOut />}
              </Button>
            )}
          </div>
          <Link to='/'>{APP_NAME}</Link>
          <Me />
        </Container>
      </header>
      <main>{children}</main>
      <footer>
        <Container>
          <Copyright name={APP_NAME} />
        </Container>
      </footer>
    </div>
  )
}
