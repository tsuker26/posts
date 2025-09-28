import { User, useProfile } from '@/entities/User'
import { useModal } from '@/shared/context/modalContext'

export const UserProfile = () => {
  const { data, isLoading } = useProfile()

  const { openModal } = useModal()

  if (!data) return null

  return (
    <User user={data} isLoading={isLoading} onEditAvatar={openModal} onEditProfile={openModal} />
  )
}
