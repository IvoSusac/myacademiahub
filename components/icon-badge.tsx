import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const backgroundVariants = cva(
    "rounded-full flex items-center justify-center",
    {
        variants: {
            variant: {
                default: "bg-gray-200",
                success: "bg-green-200",
            },
            size: {
                default: "h-6 w-6",
                sm: "h-4 w-4",
            },
            defaultVariants: {
                variant: "default",
                size: "default",
            },
        }
    }
);

const iconVariants = cva(
    "",
    {
        variants: {
            variant: {
                default: "text-gray-600",
                success: "text-green-600",
            },
            size: {
                default: "h-5 w-5",
                sm: "h-3 w-3",
            },
            defaultVariants: {
                variant: "default",
                size: "default",
            },
        }
    }
);

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;

type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
    icon: LucideIcon;
}

export const IconBadge = ({
    icon: Icon,
    variant,
    size,
}: IconBadgeProps) => {
    return (
        <div className={cn(backgroundVariants({ variant, size }))}>
            <Icon className={cn(iconVariants({ variant, size }))} />
        </div>
    );
}