import { Models } from 'node-appwrite'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Thumbnail from './Thumbnail'
import FormattedDateTime from './FormattedDateTime'
import { convertFileSize, formatDateTime } from '@/lib/utils'

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