import { api } from '@/shared/api/api'
import type { ProfileFormData } from '../ui/EditProfileForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const updateProfile = async (data: ProfileFormData) => {
  const response = await api.patch('/profile', data)
  return response.data
}
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ProfileFormData) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
    onError: (error) => {
      console.error('Ошибка обновления профиля:', error)
    },
  })
}
