import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface CourseProgressProps {
    value: number;
    variant?: "default" | "success";
    size?: "default" | "sm";
}

const colorByVariant = {
    default: "text-gray-500",
    success: "text-green-500",
};

const sizeBySize = {
    default: "text-sm",
    sm: "text-xs",
};

export const CourseProgress = ({
    value,
    variant,
    size
}: CourseProgressProps) => {
    return (
        <div>
            <Progress
                className="h-2"
                value={value}
                variant={variant}
            />
            <p className={cn(
                "font-medium mt-2 text-sky-800",
                colorByVariant[variant || "default"],
                sizeBySize[size || "default"]
            )}>
                {Math.round(value)}% Complete
            </p>
        </div>
    );
}