import { PostCard, useMyPosts } from '@/entities/Post'
import { UserAvatar } from '@/entities/User'

export const PostsList = () => {
  const { data: posts, isLoading } = useMyPosts()

  if (isLoading) return <p>Загрузка...</p>

  return (
    <div className='flex flex-col'>
      {posts?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          userAvatarRender={(props) => <UserAvatar {...props} />}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      ))}
    </div>
  )
}
