import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/shared/app-sidebar";
import { ReactNode } from "react";
import MobileNavigation from "@/components/shared/MobileNavigation";
import Header from "@/components/shared/Header";

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <>
            <SidebarProvider className="">
                <AppSidebar />
                <SidebarTrigger  />    
                <div className=" w-full">
                    <MobileNavigation />
                    <Header />
                    <div className="main-content">{children}</div>
                </div>
            </SidebarProvider>
        </>
    )
}