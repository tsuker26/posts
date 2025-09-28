import { DropzoneUploader } from '@/shared/components/DropZone'
import { useModal } from '@/shared/context/modalContext'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { useUploadAvatar } from '../api'
import { useState } from 'react'
import { Loader } from '@/shared/ui/loader'

export const EditAvatar = () => {
  const { checkIsOpen, closeModal } = useModal()
  const { mutate: uploadAvatar, isPending } = useUploadAvatar()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleUpload = () => {
    if (selectedFile) {
      uploadAvatar(selectedFile, {
        onSuccess: () => closeModal(),
      })
    }
  }
  return (
    <Dialog open={checkIsOpen('editAvatar')} onOpenChange={closeModal}>
      <DialogContent className='sm:max-w-[425px] max-h-[95vh] '>
        <DialogHeader>
          <DialogTitle>Загрузка новой фотографии</DialogTitle>
        </DialogHeader>
        <DialogDescription>Выберите файл или перетащите его сюда.</DialogDescription>
        <DropzoneUploader
          accept={{ 'image/*': [] }}
          multiple={false}
          onFileSelected={setSelectedFile}
          className='mt-4'
        />

        <div className='mt-6 flex justify-end gap-3'>
          <Button variant='outline' onClick={closeModal}>
            Отмена
          </Button>
          <Button className='w-30' onClick={handleUpload} disabled={!selectedFile || isPending}>
            {isPending ? <Loader /> : 'Сохранить'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
