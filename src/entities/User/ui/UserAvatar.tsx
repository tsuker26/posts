import { baseURL } from '@/shared/api/api'
import { cn } from '@/shared/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { PencilLine } from 'lucide-react'

type UserAvatarPropsType = {
  avatarUrl?: string
  fallbackText: string
  className?: string
  onEditAvatar?: () => void
}

export const UserAvatar = ({
  fallbackText,
  avatarUrl,
  className,
  onEditAvatar,
}: UserAvatarPropsType) => {
  return (
    <div className={cn('relative w-25 h-25 cursor-pointer group', className)}>
      <Avatar className='w-25 h-25 relative overflow-hidden rounded-full'>
        <AvatarImage src={`${baseURL}/${avatarUrl}`} />
        <AvatarFallback>{fallbackText}</AvatarFallback>
        {onEditAvatar && (
          <div
            onClick={onEditAvatar}
            className='absolute bottom-0 left-0 w-full h-1/2 bg-gray-700  flex items-center justify-center 
                     translate-y-full group-hover:translate-y-0 
                    transition-all duration-300'
          >
            <PencilLine className='h-3 w-3 text-white' />
          </div>
        )}
      </Avatar>
    </div>
  )
}
