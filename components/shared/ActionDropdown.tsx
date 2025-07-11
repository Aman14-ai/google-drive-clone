'use client'
import { Models } from 'node-appwrite'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { actionsDropdownItems } from '@/constants'
import Link from 'next/link'
import { constructDownloadUrl } from '@/lib/utils'

const ActionDropdown = ({ file }: { file: Models.Document }) => {
    const [action, setAction] = useState<ActionType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen} >
                <DropdownMenuTrigger className='shad-no-focus cursor-pointer select-none' >
                    {
                        <Image
                            src={'/assets/icons/dots.svg'}
                            width={34}
                            height={34}
                            alt='dots'
                        />
                    }
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className='truncate max-w-[200px]'>{file.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        actionsDropdownItems.map((item, index) => {
                            return (
                                <DropdownMenuItem key={item.value} className='shad-dropdown-item'
                                    onClick={() => {
                                        setAction(item);
                                        if (['rename', 'delete', 'share', 'details'].includes(item.value)) {
                                            setIsModalOpen(true);
                                        }
                                    }}
                                >
                                    {item.value === 'download'
                                        ?
                                        <Link
                                            href={constructDownloadUrl(file.bucketFileId)}
                                            download={file.name}
                                            className="flex items-center gap-2"
                                        >
                                            <Image
                                                src={item.icon}
                                                alt={item.label}
                                                width={30}
                                                height={30}
                                            />
                                            {item.label}
                                        </Link>
                                        :
                                        <div className='flex items-center gap-2'>
                                            <Image
                                                src={item.icon}
                                                alt={item.label}
                                                width={30}
                                                height={30}
                                            />
                                            {item.label}
                                        </div>
                                    }
                                </DropdownMenuItem>
                            )
                        })
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </Dialog>
    )
}

export default ActionDropdown
