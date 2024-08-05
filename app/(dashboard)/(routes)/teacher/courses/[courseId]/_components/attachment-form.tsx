"use client";

import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { File, ImageIcon, Loader2, Paperclip, Pencil, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
    initialData: Course & { attachments: Attachment[] };
    courseId: string;
}

const formSchema = z.object({
    url: z.string().min(1),
});

export const AttachmentForm = ({
    initialData,
    courseId
}: AttachmentFormProps) => {
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const toggleEditing = () => { setIsEditing(!isEditing) };


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values);
            toast.success("Course updated successfully!");
            toggleEditing();
            router.refresh();
            
        } catch {
            toast.error("An error occurred. Please try again.");
        }
    }

    const onDelete = async (id: string) => {
        try {
            setDeletingId(id);
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
            toast.success("Attachment deleted successfully!");
            router.refresh();
            
        } catch {
            toast.error("An error occurred. Please try again.");
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="flex items-center justify-between">
                Course Resources
                <Button onClick={toggleEditing} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                        <Paperclip className="h-4 w-4 mr-2" />
                        Add
                    </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <>
                    { initialData.attachments.length === 0 && (
                        <div className="text-sm text-slate-400 mt-2 italic">
                            No attachments added yet
                        </div>
                    )}
                    { initialData.attachments.length > 0 && (
                        <ul className="mt-2">
                            {initialData.attachments.map((attachment) => (
                                <li key={attachment.id} className="flex items-center gap-x-2">
                                    <File className="h-6 w-6" />
                                    <a href={attachment.url} target="_blank" rel="noreferrer">
                                        {attachment.name}
                                    </a>
                                    {deletingId === attachment.id && (
                                        <Loader2 className="ml-auto h-4 w-4 animate-spin" />
                                    )}
                                    { deletingId !== attachment.id && (
                                        <button 
                                        onClick={ () => onDelete(attachment.id) } 
                                        className="ml-auto hover:opacity-25 transition">
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseAttachment"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url: url });
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
}