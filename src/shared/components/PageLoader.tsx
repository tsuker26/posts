import { Loader2 } from 'lucide-react'

export const PageLoader = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-background/80 z-50'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-10 w-10 animate-spin text-primary' />
        <p className='text-sm text-muted-foreground'>Загрузка...</p>
      </div>
    </div>
  )
}
