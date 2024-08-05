"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Circle, Lock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
    id: string;
    label: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean;
}

export const CourseSidebarItem = ({
    id,
    label,
    isCompleted,
    courseId,
    isLocked
}: CourseSidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const Icon = isLocked? Lock : (isCompleted ? CheckCircle : Circle);
    const isActive = pathname?.includes(id);

    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`);
    }
    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center p-4 text-slate-500 hover:text-slate-600 hover:bg-slate-50",
                isActive && "bg-slate-50 text-slate-900 hover:text-slate-900 font-semibold",
                isCompleted && "text-green-500",
                isCompleted && isActive && "text-green-600",
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon size={24} className={cn(
                    "text-slate-500",
                    isActive && "text-slate-900",
                    isCompleted && "text-green-500",
                )}/>
                {label}
            </div>
            <div 
                className={cn(
                    "ml-auto opacity-0 border-2 border-slate-500 rounded-full w-4 h-4",
                    isCompleted && "border-green-500",
                    isActive && "opacity-100",
                )}
            />
        </button>
    );
}