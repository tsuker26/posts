import { api } from '@/shared/api/api'
import { useQuery } from '@tanstack/react-query'

export type PostType = {
  id: number
  text: string
  images?: string[]
  createdAt: string
  author: {
    id: number
    firstName: string
    lastName: string
    avatar?: string
    email?: string
    phone?: string
    birthDate?: string
    about?: string
  }
}

type GetMyPostsParams = {
  limit?: number
  offset?: number
  sort?: 'ASC' | 'DESC'
}

export const getMyPosts = async (params?: GetMyPostsParams) => {
  const query = new URLSearchParams()

  if (params?.limit) query.append('limit', String(params.limit))
  if (params?.offset) query.append('offset', String(params.offset))
  if (params?.sort) query.append('sort', params.sort)

  const response = await api.get(`/posts/my?${query.toString()}`)
  return response.data
}

export const useMyPosts = (params?: { limit?: number; offset?: number; sort?: 'ASC' | 'DESC' }) => {
  return useQuery<PostType[]>({
    queryKey: ['post', params],
    queryFn: () => getMyPosts(params),
  })
}
