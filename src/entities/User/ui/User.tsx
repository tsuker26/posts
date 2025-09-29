import { Card } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import type { UserType } from '../api'
import { UserAvatar } from './UserAvatar'
import { UserSkeleton } from './UserSkeleton'

type UserPropsType = {
  user: UserType
  isLoading: boolean
  onEditAvatar: () => void
  onEditProfile: () => void
}

export const User = ({ user, isLoading, onEditAvatar, onEditProfile }: UserPropsType) => {
  const avatarFallbackText = `${user.firstName?.at(0)}${user.lastName?.at(0)}`

  if (isLoading) return <UserSkeleton />

  return (
    <Card className='p-5 flex gap-5'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-5'>
          <UserAvatar
            fallbackText={avatarFallbackText}
            avatarUrl={user.avatar}
            onEditAvatar={onEditAvatar}
          />
          <div>
            <h2 className='text-xl font-bold'>
              {user?.firstName} {user?.lastName}
            </h2>
            {user?.email && <p>Email: {user?.email}</p>}
            {user?.phone && <p>Телефон: {user?.phone}</p>}
            {user?.birthDate && <p>Дата рождения: {user?.birthDate}</p>}
          </div>
        </div>
        <Button variant='outline' onClick={onEditProfile}>
          Редактировать профиль
        </Button>
      </div>
      <div className='w-full ml-3'>
        {user?.about ? <p>O себе: {user?.about}</p> : 'Укажите информацию о себе'}
      </div>
    </Card>
  )
}
