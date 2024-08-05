"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
};

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (pathname === "/" && href === "/") || pathname === href || pathname?.startsWith(`${href}/`);

    const onClick = () => {
        router.push(href);
    };

    return (
        <button onClick={onClick} type="button" className={cn(
            "flex items-center gap-x-2 transition-all pl-6 w-full px-4 py-3 text-gray-500 rounded-md hover:bg-gray-100",
            isActive ? "bg-gray-100 text-gray-900" : ""
        )}>
            <div className="flex items-center gap-x-2">
            <Icon size={22} className="mr-4" />
            {label}
            </div>

        </button>
    )
}