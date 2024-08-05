"use client";

import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Paperclip, Pencil, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
import MuxPlayer from "@mux/mux-player-react";

interface ChapterVideoProps {
    initialData: Chapter & { muxData?: MuxData | null };
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId,
}: ChapterVideoProps) => {
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => { setIsEditing(!isEditing) };


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter updated successfully!");
            toggleEditing();
            router.refresh();
            
        } catch {
            toast.error("An error occurred. Please try again.");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="flex items-center justify-between">
                Course Video
                <Button onClick={toggleEditing} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.videoUrl && (
                        <>
                        <Paperclip className="h-4 w-4 mr-2" />
                        Add
                    </>
                    )}
                    {!isEditing && initialData.videoUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center rounded-md">
                        <Video className="h-24 w-24 text-slate-300" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <MuxPlayer 
                            playbackId={initialData.muxData?.playbackId || ''}
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="chapterVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url });
                            }
                        }}
                    />
                </div>
            )}
            { initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    Videos can take a few minutes to process.
                </div>
            )}
        </div>
    );
}