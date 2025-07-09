'use client'
import { Calendar, File, FileText, Home, ImageIcon, Inbox, LayoutDashboard, Orbit, Search, Settings, VideoIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Menu items.
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

type Props = {
  fullName?: string;
  email?: string;
  avatar?: string;
}

export function AppSidebar({fullName, email , avatar}:Props) {
  const pathname = usePathname();
  return (
    <Sidebar className="px-2">

      <Link href={"/"} className="flex items-center gap-2 mt-4 px-4">
        <Image src={"/logo.png"} width={44} height={"42"} alt={"logo"} />
        <div className="text-xl text-black/50 ">Aman's Storage</div>
      </Link>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="mt-8 px-4">
            <SidebarMenu className="space-y-3 flex flex-col">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className={cn("sidebar-nav-item", pathname === item.url && "shad-active")}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} >
                      <div className="flex items-center space-x-3 text-sm text-gray-700 hover:text-[#0385ff] transition-colors">
                        <item.icon className="size-5 text-black/40" />
                        <span className="text-[1rem] font-semibold">{item.title}</span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarContent className="absolute bottom-10 w-full -ml-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="flex flex-col gap-4 items-center">
                <Image src={"/assets/images/files-2.png"} width={214} height={"122"} alt={"file"} />
                <div className="flex items-center gap-2">
                  <Image src={avatar as string || "/assets/images/avatar.png"} width={40} height={"40"} alt={"avatar"} />
                  <div>
                    <span className="font-semibold">{fullName}</span>
                    <p className="text-xs text-gray-500">{email}</p>
                  </div>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}