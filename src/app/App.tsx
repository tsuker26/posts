import { ProfilePage } from '@/pages'
import { QueryProvider } from './providers/QueryProvider/QueryProvider'
import { AppLoader } from './providers/AppLoader/AppLoader'

function App() {
  return (
    <QueryProvider>
      <AppLoader>
        <ProfilePage />
      </AppLoader>
    </QueryProvider>
  )
}

export default App
