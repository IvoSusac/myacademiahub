"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

export const SearchInput = () => {
    const [value, setValue] = useState("");
    const debouncedValue =useDebounce(value);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debouncedValue,
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }, [debouncedValue, currentCategoryId, router, pathname]);

    return (
        <div className="relative">
            <Search
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
            />
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full md:w-[300px] pl-10 rounded-full"
                placeholder="Search"
            />
        </div>
    );
}