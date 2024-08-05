import { Category, Course } from "@prisma/client";

import { getProgress } from "./get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    progress: number | null;
    chapters: { id: string }[];
};

type GetCourses = {
    userId: string;
    title?: string;
    categoryId?: string;
};

export const getCourses = async ({
    userId,
    title,
    categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
    try {
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                    mode: "insensitive",
                },
                categoryId: categoryId
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    },
                },
                purchases: {
                    where: {
                        userId,
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
            courses.map(async (course) => {
                if (!course.purchases.length) {
                    return {
                        ...course,
                        progress: null,
                    };
                }

                const progress = await getProgress(userId, course.id);

                return {
                    ...course,
                    progress,
                };
            })
        );

        return coursesWithProgress;
    
    } catch(error) {
        console.log("Error in getCourses", error);
        return [];
    }
}