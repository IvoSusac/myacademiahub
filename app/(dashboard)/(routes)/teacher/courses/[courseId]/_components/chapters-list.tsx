"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";

import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";



interface ChaptersListProps {
    items: Chapter[];
    onReorder: (updateData: { id: string; pos: number }[]) => void;
    onEdit: (id: string) => void;
};

export const ChaptersList = ({
    items,
    onReorder,
    onEdit
}: ChaptersListProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setChapters(items);
    }, [items]);

    if (!isMounted) {
        return null;
    }

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const reorderedChapters = Array.from(chapters);
        const [reorderedItem] = reorderedChapters.splice(result.source.index, 1);
        reorderedChapters.splice(result.destination.index, 0, reorderedItem);

        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);

        const updatedChapters = reorderedChapters.slice(startIndex, endIndex + 1)

        setChapters(reorderedChapters);

        const updateData = updatedChapters.map((chapter) => ({
            id: chapter.id,
            pos: reorderedChapters.findIndex((item) => item.id === chapter.id)
        }));

        onReorder(updateData);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, index) => (
                            <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={cn(
                                            "bg-white rounded-lg shadow-md p-4 mb-4",
                                            "flex items-center justify-between",
                                            "cursor-pointer",
                                            "transition-transform duration-200",
                                            "hover:shadow-lg",
                                            "transform hover:-translate-y-1",
                                            chapter.isPublished && "bg-green-100"
                                        )}
                                    >
                                            <div className="text-md font-semibold">{chapter.title}</div>
                                            <div className="ml-auto pr-2 flex items-center gap-x-2">
                                                { chapter.isFree && (
                                                    <Badge>
                                                        Free
                                                    </Badge>
                                                )}
                                                <Badge className={cn(
                                                    chapter.isPublished ? "bg-green-500" : "bg-slate-500"
                                                )}>
                                                    { chapter.isPublished ? "Published" : "Draft" }
                                                </Badge>
                                                <Pencil 
                                                onClick={() => onEdit(chapter.id)}
                                                className="h-4 w-4 cursor-pointer hover:opacity-25 transition"
                                                />
                                            </div>
                                        </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}