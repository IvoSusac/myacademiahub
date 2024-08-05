"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Loader2, Loader2Icon, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
    playbackId: string;
    courseId: string;
    chapterId: string;
    nextChapterId?: string;
    isLocked: boolean;
    title: string;
    completeOnEnd: boolean;
}

export const VideoPlayer = ({
    playbackId,
    courseId,
    chapterId,
    nextChapterId,
    isLocked,
    title,
    completeOnEnd
}: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();

    const onEnd = async () => {
        try {
            if (completeOnEnd) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isCompleted: true
                });
    
                if (nextChapterId) {
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
                }
    
                toast.success("Progress updated successfully.");
                router.refresh();
            }
        } catch {
            toast.error("An error occurred. Please try again.");
        }
    }

    return (
        <div className="relative aspect-video">
            {!isReady && !isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                </div>
            )}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col">
                    <Lock className="h-8 w-8 text-secondary" />
                    <p className="text-center text-slate-500 mt-4">
                        This video is locked. You need to purchase the course to view it.
                    </p>
                </div>
            )}
            {!isLocked && (
                <MuxPlayer 
                    title={title}
                    className={cn(
                        !isReady && "hidden",
                    )}
                    onCanPlay={() => setIsReady(true)}
                    onEnded={onEnd}
                    playbackId={playbackId}
                />
            )}
        </div>
    )
}