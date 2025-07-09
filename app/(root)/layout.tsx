import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/shared/app-sidebar";
import { ReactNode } from "react";
import MobileNavigation from "@/components/shared/MobileNavigation";
import Header from "@/components/shared/Header";
import { getCurrentUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {

    const currentUser = await getCurrentUser();
    //console.log("Current user in layout tsx file : " , currentUser);
    if(!currentUser)    return redirect("/sign-up")


    return (
        <>
            <SidebarProvider className="">
                <AppSidebar {...currentUser} />
                {/* <SidebarTrigger className="block md:hidden lg:hidden "  />     */}
                <div className=" w-full">
                    <MobileNavigation {...currentUser} />
                    <Header />
                    <div className="main-content max-sm:mt-40">{children}</div>
                </div>
            </SidebarProvider>
        </>
    )
}