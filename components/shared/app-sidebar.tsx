import { Calendar, File, FileText, Home, ImageIcon, Inbox, LayoutDashboard, Orbit, Search, Settings, VideoIcon } from "lucide-react"
import Image from "next/image"
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

// Menu items.
const items = [
  {
    title: "Documents",
    url: "#",
    icon: FileText,
  },
  {
    title: "Images",
    url: "#",
    icon: ImageIcon,
  },
  {
    title: "Media",
    url: "#",
    icon: VideoIcon ,
  },
  {
    title: "Others",
    url: "#",
    icon: Orbit,
  },

]

export function AppSidebar() {
  return (
    <Sidebar className="px-2">
      <div className="flex items-center gap-2 mt-4 px-4">
        <Image src={"/logo.png"} width={44} height={"42"} alt={"logo"} />
        <div className="text-xl text-black/50 ">Aman's Storage</div>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex mt-8 items-center gap-2 border border-brand bg-brand rounded-full px-6 py-5 text-white shadow-blue-200 shadow-drop-2">
            <span> <LayoutDashboard className="w-6 h-6 text-white" /></span>
            <span className="text-lg">Dashboard</span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4 px-4">
            <SidebarMenu className="space-y-6 flex flex-col">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} >
                      <div className="flex items-center space-x-3 mt-4 text-sm text-gray-700 hover:text-[#0385ff] transition-colors">
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
                  <Image src={"/assets/images/avatar.png"} width={40} height={"40"} alt={"avatar"} />
                  <div>
                    <span className="font-semibold">Aman Choudhary</span>
                    <p className="text-xs text-gray-500">amansachi2005@gmail.com</p>
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