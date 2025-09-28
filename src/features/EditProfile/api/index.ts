import { api } from '@/shared/api/api'
import type { EditProfileDTO } from '../ui/EditProfileForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const updateProfile = async (data: EditProfileDTO) => {
  const response = await api.patch('/profile', data)
  return response.data
}
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: EditProfileDTO) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
    onError: (error) => {
      console.error('Ошибка обновления профиля:', error)
    },
  })
}
