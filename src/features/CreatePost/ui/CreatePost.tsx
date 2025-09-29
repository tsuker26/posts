import { useModal } from '@/shared/context/modalContext'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { Plus } from 'lucide-react'

export const CreatePost = () => {
  const { checkIsOpen, openModal, closeModal } = useModal()

  const handleOpenModal = () => {
    openModal('createPost')
  }

  return (
    <div className='flex items-center justify-center h-0.5'>
      <Button onClick={handleOpenModal} className='w-full' variant='outline'>
        <div className='flex items-center gap-2'>
          <Plus className='w-4 h-4' />
          <span>Создать пост</span>
        </div>
      </Button>
      <Dialog open={checkIsOpen('createPost')} onOpenChange={closeModal}>
        <DialogContent className='sm:max-w-[425px] max-h-[95vh] '>
          <DialogHeader>
            <DialogTitle>Создать пост</DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}
