'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import {   FileText,  ImageIcon,  LayoutDashboard, Orbit,   VideoIcon } from "lucide-react"
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import FileUploader from './FileUploader'
import { signOutUser } from '@/lib/actions/user.action'

type Props = {
  fullName?: string;
  email?: string;
  avatar?: string;
  $id: string;
  accountId: string
}

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Documents",
    url: "/documents",
    icon: FileText,
  },
  {
    title: "Images",
    url: "/images",
    icon: ImageIcon,
  },
  {
    title: "Media",
    url: "/media",
    icon: VideoIcon,
  },
  {
    title: "Others",
    url: "/others",
    icon: Orbit,
  },

]

const MobileNavigation = ({ fullName, email, avatar , $id:ownerId , accountId }: Props) => {

  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className='md:hidden  w-full z-50 bg-white shadow-md flex items-center justify-between px-4 py-2'>
      <Link href={"/"} className="flex items-center gap-2 px-2">
        <Image src={"/logo.png"} width={44} height={42} alt={"logo"} />
      </Link>

      <Sheet open={open} onOpenChange={setOpen} >
        <SheetTrigger asChild>
          <Menu className='cursor-pointer hover:scale-105 transition-all text-black opacity-60 w-6 h-6' />
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Image src={avatar as string || "/assets/images/avatar.png"} width={40} height={"40"} alt={"avatar"} />
                  <div>
                    <span className="font-semibold">{fullName}</span>
                    <p className="text-xs text-gray-500">{email}</p>
                  </div>
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className=" flex flex-col items-center justify-center gap-4 mt-4 ">
            <div className='w-full px-4'>
            {
              items.map((item) => {
                return (
                  <div key={item.title} className={cn("sidebar-nav-item  ", pathname === item.url && "shad-active ")}>
                    <div >
                      <a href={item.url} >
                        <div className="flex items-center space-x-3 text-sm text-gray-700 hover:text-[#0385ff] transition-colors">
                          <item.icon className="size-5 text-black/40" />
                          <span className="text-[1rem] font-semibold">{item.title}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                )
              })
            }
            </div>
          </div>

          <div className="flex flex-col justify-between gap-5 pb-5 ">
            <FileUploader ownerId={ownerId} accountId={accountId} />
            <Button
              type="submit"
              className="mobile-sign-out-button cursor-pointer"
              onClick={async() => await signOutUser()}
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default MobileNavigation