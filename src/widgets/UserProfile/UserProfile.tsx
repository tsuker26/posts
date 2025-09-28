import { User, useProfile } from '@/entities/User'
import { EditAvatar } from '@/features/EditAvatar'
import { EditProfile } from '@/features/EditProfile'
import { useModal } from '@/shared/context/modalContext'

export const UserProfile = () => {
  const { data, isLoading } = useProfile()

  const { openModal } = useModal()

  const handleOpenEditAvatar = () => {
    openModal('editAvatar')
  }

  const handleOpenEditProfile = () => {
    openModal('editProfile')
  }

  if (!data) return null

  return (
    <>
      <User
        user={data}
        isLoading={isLoading}
        onEditAvatar={handleOpenEditAvatar}
        onEditProfile={handleOpenEditProfile}
      />
      <EditProfile user={data} />
      <EditAvatar />
    </>
  )
}
