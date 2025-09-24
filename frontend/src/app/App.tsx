import { ThemeProvider } from '@/shared/components/theme-provider'
import { StoreProvider } from './store'
import { BrowserRouter, Routes, Route } from 'react-router'
import { RoundsView } from '@/views/rounds-view'
import { RoundView } from '@/views/round-view'
import { LoginView } from '@/views/login-view'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<RoundsView />} />
            <Route path=':id' element={<RoundView />} />
            <Route path='/login' element={<LoginView />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </ThemeProvider>
  )
}

export default App
