import { ThemeProvider } from '@/components/theme-provider'
import { HomeView } from '@/views/home-view'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <HomeView />
      </ThemeProvider>
    </>
  )
}

export default App
