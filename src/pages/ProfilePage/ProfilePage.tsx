import { CreatePost } from '@/features/CreatePost'
import { UserProfile } from '@/widgets/UserProfile'

export const ProfilePage = () => {
  return (
    <main className='flex flex-col gap-y-8 max-w-200 m-auto mt-10 p-10'>
      <UserProfile />
      <CreatePost />
    </main>
  )
}
