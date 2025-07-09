'use client'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'
import { cn, convertFileToUrl, getFileType } from '@/lib/utils'
import Image from 'next/image'
import Thumbnail from './Thumbnail'
import { X } from 'lucide-react'


type Props = {
  ownerId?: string;
  accountId?: string;
  className?: string;
}
const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles)

  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveFile = async (e: React.MouseEvent<HTMLImageElement>, fileName: string) => {
    //e.preventDefault();
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));

  }

  const clearAllFiles = async(e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFiles([]);
  }

  return (
    <div {...getRootProps()} className='cursor-pointer px-4 py-2'>
      <input {...getInputProps()} />
      <Button type="button" className={cn("uploader-button", className)}>
        <Image
          src="/assets/icons/upload.svg"
          alt="upload"
          width={24}
          height={24}
        />{" "}
        <p>Upload</p>
      </Button>

      {
        files.length > 0 && (
          <ul className='uploader-preview-list'>
            <div className='flex items-center justify-between'>
              <h4 className="h4 text-light-100">Uploading...</h4>
              <div className="relative group inline-block">
                <button onClick={(e) => clearAllFiles(e)} className="p-1 hover:bg-gray-100 rounded transition">
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  Clear
                </div>
              </div>

            </div>
            {
              files.map((file, index) => {
                const { type, extension } = getFileType(file.name);
                return (
                  <li
                    key={`${file.name}-${index}`}
                    className="uploader-preview-item"
                  >
                    <div className="flex items-center gap-3">
                      <Thumbnail
                        type={type}
                        extension={extension}
                        url={convertFileToUrl(file)}
                      />

                      <div className="preview-item-name">
                        {file.name}
                        <Image
                          src="/assets/icons/file-loader.gif"
                          width={80}
                          height={26}
                          alt="Loader"
                        />
                      </div>
                    </div>

                    <Image
                      src="/assets/icons/remove.svg"
                      width={24}
                      height={24}
                      alt="Remove"
                      onClick={(e) => handleRemoveFile(e, file.name)}
                    />
                  </li>
                )
              })
            }
          </ul>
        )
      }

      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUploader
