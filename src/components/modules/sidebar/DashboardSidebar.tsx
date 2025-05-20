"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    LogOut,
    Bell,
    Upload,
    MessageSquareCode,
    Newspaper,
    Layers,
    PencilLine,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { HiChevronUpDown } from "react-icons/hi2";
import { TUser } from "@/types/user";
import { getMyProfile, logoutUser } from "@/services/login";
// Extend JWT Payload to include role

const DashboardSidebar = () => {
    const pathname = usePathname();
    const [myProfile, setMyProfile] = useState<TUser | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            const { data } = await getMyProfile();
            setMyProfile(data);
        }
        fetchProfile();
    }, []);
    const handleLogout = async () => {
        try {
            await logoutUser();
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    const items = [
        {
            title: "Messages",
            url: "/dashboard/messages",
            icon: MessageSquareCode,
        },
        {
            title: "Upload Project",
            url: "/dashboard/upload-project",
            icon: Upload,
        },
        {
            title: "Write Blog",
            url: "/dashboard/write-blog",
            icon: PencilLine,
        },
        {
            title: "All Projects",
            url: "/dashboard/all-projects",
            icon: Layers,
        },
        {
            title: "All Blogs",
            url: "/dashboard/all-blogs",
            icon: Newspaper,
        },
    ];

    return (
        <Sidebar >
            <SidebarContent className="bg-purple-300 border-r-2 border-r-purple-600">
                <SidebarGroup>
                    <h1 className="text-2xl text-purple-700 font-semibold border-b-2 border-purple-600 pb-3 text-center">
                        Portfolio
                    </h1>
                    <SidebarGroupContent>
                        <SidebarMenu className="mt-10">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            className={` ${pathname === item.url ? "bg-purple-500 text-white" : ""
                                                } text-[16px] rounded-none text-purple-600`}
                                            href={item.url}>
                                            <item.icon
                                                className={`mr-2 ${pathname === item.url ? "text-white" : ""
                                                    } text-purple-600 h-5 w-5`}
                                            />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <Avatar className=" pb-2 bg-purple-300  border-r-2 border-purple-500">
                <div className="flex gap-2">
                    <AvatarImage
                        className="relative top-1 w-[44px] h-[44px] rounded-full border border-purple-500"
                        src={myProfile?.image || "https://github.com/shadcn.png"}
                    />
                    <div>
                        <h1 className="font-semibold text-[15px]">{myProfile?.name}</h1>
                        <p className="font-semibold text-[14px] text-purple-500">
                            {myProfile?.email}
                        </p>
                    </div>
                    <Popover>
                        <PopoverTrigger>
                            <HiChevronUpDown className="text-xl  cursor-pointer text-purple-500" />
                        </PopoverTrigger>
                        <PopoverContent className="relative left-52">
                            <div>
                                <div className="flex gap-3 border-b border-purple-500 pb-4">
                                    <AvatarImage
                                        className="relative top-1 w-[44px] h-[44px] rounded-full border border-purple-500"
                                        src={myProfile?.image || "https://github.com/shadcn.png"}
                                    />
                                    <div>
                                        <h1 className="font-semibold text-[15px]">
                                            {myProfile?.name}
                                        </h1>
                                        <p className="font-semibold text-[14px] text-purple-500">
                                            {myProfile?.email}
                                        </p>
                                    </div>
                                </div>
                                <ul className="divide-y">
                                    <li
                                        onClick={handleLogout}
                                        className="mt-4  flex gap-2 cursor-pointer hover:bg-purple-500 p-1 hover:text-white">
                                        <LogOut className="relative top-1" size={18} /> Logout
                                    </li>
                                    <li className="mt-2  flex gap-2 cursor-pointer hover:bg-purple-500 p-1 hover:text-white">
                                        <Bell className="relative top-1" size={18} /> Notification
                                    </li>
                                </ul>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </Sidebar>
    );
};

export default DashboardSidebar;