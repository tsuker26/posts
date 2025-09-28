import { User, useProfile } from '@/entities/User'

type PropsType = {}

export const UserProfile = ({}: PropsType) => {
  const { data, isLoading, error } = useProfile()

  console.log('profile', data)

  if (!data) return null

  return <User user={data} isLoading={isLoading} onEditAvatar={() => {}} onEditProfile={() => {}} />
}
