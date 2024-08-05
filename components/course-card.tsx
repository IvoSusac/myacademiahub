import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { CourseProgress } from "./course-progress";

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    category: string;
    progress: number | null;
}

export const CourseCard = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    category,
    progress,
}: CourseCardProps) => {
    return (
        <Link href={`/courses/${id}`}>
            <div className="group hover:shadow-sm trnasition overflow-hidden border rounded-lg p-3 h-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                        className="object-cover"
                        layout="fill"
                        src={imageUrl}
                        alt={title}
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <div className="text-lg md:text-base font-medium transition">
                        {title}
                    </div>
                </div>
                <p className="text-xs text-muted-foreground">
                    {category}
                </p>
                <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                    <div className="flex items-center gap-x-2 text-slate-400">
                        <span>
                            {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                        </span>
                    </div>
                </div>
                {progress !== null ? (
                    <CourseProgress
                        value={progress}
                        variant={ progress === 100 ? "success" : "default" }
                        size="sm"
                    />
                ) : (
                    <p className="text-md md:text-sm font-medium text-slate-700">
                        {formatPrice(price)}  
                    </p>
                )}
            </div>
        </Link>
    );
}