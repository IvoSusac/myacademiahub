"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CategoryItemProps {
    label: string;
    value?: string;
}

export const CategoryItem = ({
    label,
    value,
}: CategoryItemProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategoryId = searchParams.get("categoryId");
    const currentTitle = searchParams.get("title");

    const isSelected = value === currentCategoryId;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                categoryId: isSelected ? null : value
            },
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "py-2 px-3 text-sm border border-gray-300 rounded-full flex items-center gap-x-1 hover:bg-gray-100 transition",
                isSelected && "bg-gray-300"
            )}
            type="button"
        >
            <div className="truncate">
                {label}
            </div>
        </button>
    );
}