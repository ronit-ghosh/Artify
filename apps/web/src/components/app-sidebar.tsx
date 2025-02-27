"use client"
import { ChevronDown, CircleUserRound, GalleryVerticalEnd, LayoutDashboard, LogOut, Sparkles, SunMoon, Wallet, WandSparkles } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { useTheme } from "next-themes"
import { User } from "./User"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { SignOutButton } from "@clerk/clerk-react"
import Link from "next/link"

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
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span className="text-[1rem]">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <SidebarMenuButton
                                onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}
                                className="py-6 pl-4 gap-3 cursor-pointer">
                                <SunMoon />
                                <span className="text-[1rem]"> Change Appearance</span>
                            </SidebarMenuButton>
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarGroup>
                                    <SidebarGroupLabel asChild>
                                        <CollapsibleTrigger>
                                            Settings
                                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                        </CollapsibleTrigger>
                                    </SidebarGroupLabel>
                                    <CollapsibleContent>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild className="py-6 pl-4 gap-3">
                                                <Link href="/credits">
                                                    <Wallet />
                                                    <span className="text-[1rem]">Buy Credits</span>
                                                </Link>
                                            </SidebarMenuButton>
                                            <SidebarMenuButton asChild className="py-6 pl-4 gap-3">
                                                <Link href="/user">
                                                    <CircleUserRound />
                                                    <span className="text-[1rem">Your Account</span>
                                                </Link>
                                            </SidebarMenuButton>
                                            <SidebarMenuButton asChild className="py-6 pl-4 gap-3 cursor-pointer">
                                                <SignOutButton >
                                                    <span><LogOut />Logout</span>
                                                </SignOutButton>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </CollapsibleContent>
                                </SidebarGroup>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarContent className="flex-row">
                    <User />
                </SidebarContent>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

