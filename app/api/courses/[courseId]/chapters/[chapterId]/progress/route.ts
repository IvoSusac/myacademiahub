import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
) {
    try {
        const { userId } = auth();
        const { isCompleted } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userProgress = await db.userProgress.upsert({
            where: {
                userId_chapterId: {
                    chapterId: params.chapterId,
                    userId,
                },
            },
            create: {
                userId,
                chapterId: params.chapterId,
                isCompleted,
            },
            update: {
                isCompleted,
            },
        });

        return NextResponse.json(userProgress);
    } catch (error) {
        console.log("Error updating progress", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}