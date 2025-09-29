import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { cn } from '../lib/utils'
import { X } from 'lucide-react'

type DropzoneUploaderProps = {
  files?: File[]
  accept?: Record<string, string[]>
  multiple?: boolean
  onFilesSelected: (files: File[]) => void
  className?: string
}

export const DropzoneUploader = ({
  files,
  accept = { 'image/*': [] },
  multiple = false,
  onFilesSelected,
  className,
}: DropzoneUploaderProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>(files || [])
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    files ? files.map((file) => URL.createObjectURL(file)) : []
  )

  const updatePreviews = (files: File[]) => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url))
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)))
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = multiple ? [...selectedFiles, ...acceptedFiles] : acceptedFiles
      setSelectedFiles(newFiles)
      updatePreviews(newFiles)
      onFilesSelected(newFiles)
    },
    [selectedFiles, multiple, onFilesSelected]
  )

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    setSelectedFiles(newFiles)
    updatePreviews(newFiles)
    onFilesSelected(newFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  })

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previewUrls])

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
      {previewUrls.length > 0 ? (
        <div className='flex flex-wrap gap-2'>
          {previewUrls.map((url, i) => (
            <div key={i} className='relative group'>
              <img src={url} alt='Preview' className='w-20 h-20 object-cover rounded-lg' />
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(i)
                }}
                className='absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition'
              >
                <X className='w-3 h-3 text-white' />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center'>Перетащите файлы сюда или кликните для выбора</p>
      )}
    </div>
  )
}
