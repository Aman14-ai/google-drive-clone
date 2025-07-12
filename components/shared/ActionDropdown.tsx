'use client'
import { Models } from 'node-appwrite'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import { Input } from '../ui/input'
import { DialogClose } from '@radix-ui/react-dialog'

const ActionDropdown = ({ file }: { file: Models.Document }) => {
    const [action, setAction] = useState<ActionType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [name, setName] = useState(file.name)
    const [isLoading , setIsLoading] = useState(false);

    const closeAllModals = () => {
        setIsModalOpen(false);
        setIsDropdownOpen(false);
        setAction(null);
        setName(file.name);
        setIsLoading(false);
        // setEmail([]);
    }

    const handleAction = async() => {

    }

    const renderDialogContent = () => {
        if (!action) return null;
        const { value, label } = action;
        return (
            <DialogContent className='shad-dialog button'>
                <DialogHeader className='flex flex-col gap-3'>
                    <DialogTitle className='text-center text-light-100'>
                        {label}
                    </DialogTitle>
                    {
                        value === 'rename' &&
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="selection:bg-brand-100 selection:text-black"
                        />
                    }
                </DialogHeader>
                {
                    ['rename', 'share', 'delete'].includes(value) &&
                    (
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" className='cursor-pointer'>Cancel</Button>
                            </DialogClose>
                            {
                                isLoading ? (<Button className='bg-brand text-black hover:bg-brand-100'><Image src={'/assets/icons/loader.svg'} alt='loader' width={24} height={24} className='animate-spin' /></Button>) : (<Button type="submit" className='cursor-pointer hover:bg-brand bg-brand-100 text-black'>Save changes</Button>)
                            }
                        </DialogFooter>
                    )
                }
            </DialogContent>
        )
    }

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
                                <DropdownMenuItem
                                    key={item.value}
                                    className='shad-dropdown-item'
                                    onClick={() => {
                                        setAction(item);
                                        if (['rename', 'delete', 'share', 'details'].includes(item.value)) {
                                            //console.log("Is modal open ", isModalOpen);
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
            {renderDialogContent()}
            {/* // this only open when isOpenModal is true */}
        </Dialog>
    )
}

export default ActionDropdown
