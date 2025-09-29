import { PostCard, useMyPosts, type PostType } from '@/entities/Post'
import { UserAvatar } from '@/entities/User'
import { RemovePost } from '@/features/RemovePost'
import { useModal } from '@/shared/context/modalContext'
import { useState } from 'react'
import { Loader } from '@/shared/ui/loader'
import { useInView } from 'react-intersection-observer'

export const PostsList = () => {
  const [postId, setPostId] = useState<number | null>(null)
  const { openModal } = useModal()

  const {
    data: posts,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    hasNoPosts,
  } = useMyPosts({
    limit: 5,
    sort: 'DESC',
  })

  const handleChangePage = (inView: boolean) => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  const handleRemovePost = (id: number) => {
    openModal('removePost')
    setPostId(id)
  }

  const handleEditPost = (id: number) => {
    openModal('editPost')
    setPostId(id)
  }

  const { ref } = useInView({
    threshold: 1,
    onChange: handleChangePage,
  })

  if (isLoading) return <Loader />
  if (hasNoPosts) return <h2 className='m-auto'>Постов нет</h2>

  return (
    <div className='flex flex-col'>
      {posts?.pages.map((page) =>
        page.map((post: PostType) => (
          <PostCard
            key={post.id}
            post={post}
            userAvatarRender={(props) => <UserAvatar {...props} />}
            onEdit={handleEditPost}
            onRemove={handleRemovePost}
          />
        ))
      )}

      {hasNextPage && (
        <div ref={ref} className='flex justify-center p-4'>
          <Loader />
        </div>
      )}

      {postId && <RemovePost postId={postId} />}
    </div>
  )
}
