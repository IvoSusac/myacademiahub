"use client";

import { Search, LayoutDashboard, List, BarChart } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Search,
        label: "Browse Courses",
        href: "/search",
    },
]; 

const teacherRoutes = [
    {
        icon: List,
        label: "My Courses",
        href: "/teacher/courses",
    },
];

export const SidebarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teacher");

    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem 
                    key={route.label}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}