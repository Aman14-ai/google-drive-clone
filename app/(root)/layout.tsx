import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/shared/app-sidebar";
import { ReactNode } from "react";
import MobileNavigation from "@/components/shared/MobileNavigation";
import Header from "@/components/shared/Header";
import { getCurrentUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import Search from "@/components/shared/Search";

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
                    <div className='md:hidden  w-full z-50 my-2'>
                        <Search />
                    </div>
                    <Header userId={currentUser.$id} accountId={currentUser.accountId}  />
                    <div className="main-content">{children}</div>
                </div>
            </SidebarProvider>
        </>
    )
}