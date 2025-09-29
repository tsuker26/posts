import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Textarea } from '@/shared/ui/textarea'
import { Label } from '@/shared/ui/label'
import { Button } from '@/shared/ui/button'
import { DropzoneUploader } from '@/shared/components/DropZone'

const postSchema = z.object({
  text: z.string().min(1, 'Текст обязателен'),
  images: z.array(z.instanceof(File)).optional(),
})

export type PostFormData = z.infer<typeof postSchema>

type PostFormProps = {
  initialData?: PostFormData
  isLoading?: boolean
  onSubmit: (data: PostFormData) => void
  onCancel?: () => void
}

export const PostForm = ({ initialData, isLoading, onSubmit, onCancel }: PostFormProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData || {
      text: '',
      images: [],
    },
  })
  const handleFilesSelected = (files: File[]) => {
    setValue('images', files)
    setSelectedFiles(files)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 max-h-[80vh] overflow-y-auto'
    >
      <div className='grid gap-2 relative'>
        <Label htmlFor='text'>Текст поста</Label>
        <Textarea id='text' {...register('text')} rows={4} />
        {errors.text && (
          <p className='text-sm text-red-500 absolute top-14'>{errors.text.message}</p>
        )}
      </div>

      <DropzoneUploader
        files={selectedFiles}
        multiple
        onFilesSelected={handleFilesSelected}
        className='mt-4'
      />

      <div className='mt-4 flex gap-3 justify-end border-t pt-4 shrink-0 bg-background'>
        {onCancel && (
          <Button variant='outline' type='button' onClick={onCancel}>
            Отмена
          </Button>
        )}
        <Button type='submit' disabled={!isDirty || isLoading} isLoading={isLoading}>
          Сохранить
        </Button>
      </div>
    </form>
  )
}
