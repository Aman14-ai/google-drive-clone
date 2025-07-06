import { ReactNode } from "react";
import Image from 'next/image'
import NamedLogo from "@/utils/NamedLogo";

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="flex min-h-screen">

            <section className="bg-brand  w-1/2 hidden lg:flex lg:flex-col justify-center items-center xl:w-2/5 ">

                <div className="flex flex-col space-y-7 p-10">
                    <NamedLogo />
                    <div className="flex items-center gap-4 -mt-8">
                        <Image src={"/logo.png"} width={104} height={"82"} alt={"logo"} />
                        <div className="text-3xl text-black/50 ">Aman's Storage</div>
                    </div>

                    <div className="space-y-5 text-white">
                        <h1 className="h1">Manage your files the best way.</h1>
                        <p className="body-1">This is a place where you can store all your documents.</p>
                    </div>

                    <Image
                        src={"/assets/images/files.png"}
                        width={400}
                        height={400} alt={"files"}
                        className="transition-all hover:rotate-2 hover:scale-105"
                    />

                </div>
            </section>

            <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
                <div className="mt-2 lg:mt-10 ">
                    <div className="flex items-center gap-4 -mt-8">
                        <Image src={"/logo.png"} width={80} height={72} alt={"logo"} />
                        <div className="text-2xl text-black/50 ">Aman's Storage</div>
                    </div>
                </div>
                {children}
            </section>

        </div>
    )
}