import { Models } from 'node-appwrite'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Thumbnail from './Thumbnail'
import FormattedDateTime from './FormattedDateTime'
import { convertFileSize, formatDateTime } from '@/lib/utils'
import { Input } from '../ui/input'
import { X } from 'lucide-react'
import { Button } from '../ui/button'

const ImageThumbnail = ({ file }: { file: Models.Document }) => {
  return (
    <motion.div
      className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.1)"
      }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Thumbnail type={file.type} extension={file.extension} url={file.url} />
      </motion.div>

      <div className="flex flex-col">
        <motion.p
          className="text-lg font-semibold text-gray-800 mb-1"
          whileHover={{
            x: 5,
            color: '#3b82f6'
          }}
          transition={{ duration: 0.2 }}
        >
          {file.name}
        </motion.p>
        <FormattedDateTime
          date={file.$createdAt}
          className='text-sm text-gray-500'
        />
      </div>
    </motion.div>
  )
}

const DetailRow = ({ label, value }: { label: string, value: string }) => (
  <motion.div
    className='flex justify-between items-center py-3 px-6 bg-white rounded-lg my-2 shadow-xs'
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{
      type: "spring",
      stiffness: 120,
    }}
    whileHover={{
      x: 5,
      backgroundColor: "#f8fafc"
    }}
  >
    <p className='text-gray-500 font-medium'>{label}</p>
    <motion.p
      className='text-sm font-semibold text-gray-700 bg-gray-50 px-3 py-1 rounded-md'
      whileHover={{
        scale: 1.05,
        backgroundColor: "#eff6ff",
        color: "#2563eb"
      }}
    >
      {value}
    </motion.p>
  </motion.div>
)

export const FileDetails = ({ file }: { file: Models.Document }) => {
  const details = [
    { label: "Format", value: file.extension },
    { label: "Size", value: convertFileSize(file.size) },
    { label: "Owner", value: file.owner.fullName },
    { label: "Last edit", value: formatDateTime(file.$updatedAt) }
  ]

  return (
    <motion.div
      className="bg-gray-50 p-6 rounded-2xl shadow-inner"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <ImageThumbnail file={file} />

      <motion.div className="mt-6 space-y-2">
        {details.map((detail, index) => (
          <DetailRow
            key={`${detail.label}-${index}`}
            label={detail.label}
            value={detail.value}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

type Props = {
  file: Models.Document;
  removeUser: (email: string) => void;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ShareInput = ({ file, removeUser, onInputChange }: Props) => {
  return (
    <motion.div 
      className="flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <ImageThumbnail file={file} />
      
      <div className="share-wrapper bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <motion.div
          className="flex flex-col gap-4"
          initial={{ y: 10 }}
          animate={{ y: 0 }}
        >
          <p className='subtitle-2 text-gray-700 font-medium'>Share file with other users</p>
          
          <Input
            type='email'
            placeholder='Enter email address'
            onChange={(e) => onInputChange(e.target.value.trim().split(','))}
            className='share-input-field w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all'
          />
          
          <div className="pt-4">
            <motion.div
              className="flex justify-between items-center pb-3 border-b border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className='subtitle-2 text-gray-600 font-medium'>Shared with:</p>
              <motion.p
                className='subtitle-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm'
                whileHover={{ scale: 1.05, backgroundColor: "#dbeafe" }}
              >
                {file.users.length} {file.users.length === 1 ? 'user' : 'users'}
              </motion.p>
            </motion.div>

            <ul className='pt-3 space-y-2 max-h-50 overflow-y-auto overflow-x-clip custom-scrollbar'>
              {file.users.map((email: string) => (
                <motion.li
                  key={email}
                  className='flex items-center justify-between gap-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ x: 3 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <p className="subtitle-2 text-gray-800">
                      {email}
                    </p>
                  </div>
                  <motion.button
                    onClick={() => removeUser(email)}
                    className="w-8 cursor-pointer h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400 hover:text-red-600"
                    whileHover={{ scale: 1.1, backgroundColor: "#fee2e2" }}
                    whileTap={{ scale: 0.95 }}
                    title="Remove user"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

