"use client"
import { GalleryVerticalEnd, LayoutDashboard, Settings, Sparkles, SunMoon, WandSparkles } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Image from "next/image"
import { useTheme } from "next-themes"

const items = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Packs",
        url: "/packs",
        icon: GalleryVerticalEnd,
    },
    {
        title: "Train Model",
        url: "/train",
        icon: Sparkles,
    },
    {
        title: "Generate Images",
        url: "/generate",
        icon: WandSparkles,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    const { theme, setTheme } = useTheme()
    return (
        <Sidebar collapsible="icon" >
            <SidebarHeader className="flex justify-between px-1">
                <SidebarContent>
                    <span className="flex items-center gap-1 py-3 border-b">
                        <Image
                            src="https://res.cloudinary.com/drynqkitl/image/upload/v1740221612/Artify_uda5oc.png"
                            alt="Logo"
                            width={1000}
                            height={1000}
                            className="w-9 h-9 border rounded-lg bg-black"
                            id="logo"
                        />
                        <span className="text-xl mb-1 pl-2">Artify AI</span>
                    </span>
                </SidebarContent>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="py-6 pl-4 gap-3">
                                        <a href={item.url}>
                                            <item.icon />
                                            <span className="text-[1rem]">{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <SidebarMenuButton
                                onClick={() => {
                                    theme === "dark" ? setTheme("light") : setTheme("dark")
                                }}
                                className="py-6 pl-4 gap-3 cursor-pointer">
                                <SunMoon />
                                <span className="text-[1rem]"> Change Appearance</span>
                            </SidebarMenuButton>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarContent className="flex-row">
                    <Avatar className="">
                        <AvatarImage src="https://res.cloudinary.com/drynqkitl/image/upload/v1740220285/Dp_oxgveh.jpg" alt="DP" />
                        <AvatarFallback>RG</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm">Ronit Ghosh</span>
                        <span className="text-xs font-thin">ronitghosh06@gmail.com</span>
                    </div>
                </SidebarContent>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}

