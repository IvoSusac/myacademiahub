"use client"

import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
        return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Title
                <ArrowUpDown
                    size={16}
                    className="ml-2"
                />
            </Button>
        )
    }
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
        return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Price
                <ArrowUpDown
                    size={16}
                    className="ml-2"
                />
            </Button>
        )
    },
    cell: ({ row }) => {
        const price = parseFloat(row.getValue("price") || "0");
        const formattedPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);

        return formattedPrice;
    }
  },
  {
    accessorKey: "isPublished",
    header: "Published",
    cell: ({ row }) => {
        const isPublished = row.getValue("isPublished") || false;

        return (
            <Badge className={cn(
                isPublished ? "bg-green-500" : "bg-slate-500"
            )}>
                { isPublished ? "Published" : "Draft" }
            </Badge>
        )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
        const { id } = row.original;

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <MoreHorizontal size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Link href={`/teacher/courses/${id}`}>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
 },
]
