import { ProfilePage } from '@/pages'
import { QueryProvider } from './providers/QueryProvider/QueryProvider'
import { AppLoader } from './providers/AppLoader/AppLoader'
import { ModalProvider } from './providers/ModalProvider/ModalProvider'

function App() {
  return (
    <QueryProvider>
      <AppLoader>
        <ModalProvider>
          <ProfilePage />
        </ModalProvider>
      </AppLoader>
    </QueryProvider>
  )
}

export default App
