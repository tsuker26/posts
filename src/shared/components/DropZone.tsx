import { useState, useCallback, type ReactNode } from 'react'
import { useDropzone } from 'react-dropzone'
import { cn } from '../lib/utils'

type DropzoneUploaderProps = {
  accept?: Record<string, string[]>
  multiple?: boolean
  onFileSelected: (file: File) => void
  children?: ReactNode
  className?: string
}

export const DropzoneUploader = ({
  accept = { 'image/*': [] },
  multiple = false,
  onFileSelected,
  children,
  className,
}: DropzoneUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setPreviewUrl(URL.createObjectURL(file))
        onFileSelected(file)
      }
    },
    [onFileSelected]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        'flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition',
        isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-secondary',
        className
      )}
    >
      <input {...getInputProps()} />
      {previewUrl ? (
        <img src={previewUrl} alt='Preview' className='w-40 h-40 object-cover rounded-full' />
      ) : (
        <p className='text-white text-center'>Перетащите файл сюда или кликните для выбора</p>
      )}
      {children}
    </div>
  )
}
