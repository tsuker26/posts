import { api } from '@/shared/api/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const uploadAvatar = async (file: File) => {
  const formData = new FormData()
  formData.append('avatar', file)

  const response = await api.patch('/profile/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const useUploadAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['post'] })
    },
    onError: (error) => {
      console.error('Ошибка загрузки аватара:', error)
    },
  })
}
