import { PostCard, useMyPosts } from '@/entities/Post'
import { UserAvatar } from '@/entities/User'
import { RemovePost } from '@/features/RemovePost'
import { useModal } from '@/shared/context/modalContext'
import { useState } from 'react'

export const PostsList = () => {
  const [postId, setPostId] = useState<number | null>(null)
  const { data: posts, isLoading } = useMyPosts()

  const { openModal } = useModal()

  const handleRemovePost = (id: number) => {
    openModal('removePost')
    setPostId(id)
  }
  const handleEditPost = (id: number) => {
    openModal('editPost')
    setPostId(id)
  }

  if (isLoading) return <p>Загрузка...</p>

  return (
    <div className='flex flex-col'>
      {posts?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          userAvatarRender={(props) => <UserAvatar {...props} />}
          onEdit={handleEditPost}
          onRemove={handleRemovePost}
        />
      ))}
      {postId && <RemovePost postId={postId} />}
    </div>
  )
}
