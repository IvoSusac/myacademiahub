import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { CourseProgressButton } from "./_components/course-progress-button";
import { FiDownload } from 'react-icons/fi';

const ChapterIdPage = async ({
    params
}: {
    params: {
        courseId: string;
        chapterId: string;
    };
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const { chapter, course, muxData, attachments, nextChapter, userProgress, purchase } = await getChapter({
        userId,
        courseId: params.courseId,
        chapterId: params.chapterId
    });

    if (!chapter || !course) {
        return redirect("/");
    }

    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    return (
        <div>
            {userProgress?.isCompleted && (
                <Banner
                    variant="success"
                    label="You have completed this chapter!"
                />
            )}
            {isLocked && (
                <Banner
                    variant="warning"
                    label="This chapter is locked. You need to purchase the course to view it."
                />
            )}
            <div className="flex flex-col max-w-4xl mx-auto pb-20">
                <div className="p-4">
                    <VideoPlayer
                        chapterId={params.chapterId}
                        title={chapter.title}
                        courseId={params.courseId}
                        nextChapterId={nextChapter?.id}
                        isLocked={isLocked}
                        playbackId={muxData?.playbackId!}
                        completeOnEnd={completeOnEnd}
                    />
                </div>
                <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-2">
                            {chapter.title}
                        </h2>
                        {purchase ? (
                            <CourseProgressButton
                                chapterId={params.chapterId}
                                courseId={params.courseId}
                                nextChapterId={nextChapter?.id}
                                isCompleted={!!userProgress?.isCompleted}
                            />
                        ) : (
                            <CourseEnrollButton
                                courseId={params.courseId}
                                price={course.price!}
                            />
                        )}
                    </div>
                    <Separator/>
                    <div>
                        <Preview value={chapter.description!} />
                    </div>
                    {!!attachments.length && (
                        <>
                            <Separator />
                            <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <p className="">Attachments:</p>
                                    {attachments.map((attachment) => (
                                        <div
                                            key={attachment.id}
                                            //href={attachment.url}
                                            //target="_blank"
                                            className="p-4 bg-slate-200 rounded-md flex items-center justify-between"
                                        >
                                            <span>{attachment.name}</span>
                                            <a
                                                href={`/api/download?url=${encodeURIComponent(attachment.url)}&name=${encodeURIComponent(attachment.name)}`}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <FiDownload className="h-4 w-4" />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default ChapterIdPage;