"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { formatPrice } from "@/lib/format";

interface PriceFormProps {
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    price: z.coerce.number().min(0, "Price cannot be negative"),
});

export const PriceForm = ({
    initialData,
    courseId
}: PriceFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => { setIsEditing(!isEditing) };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || undefined
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course updated successfully!");
            toggleEditing();
            router.refresh();
            
        } catch {
            toast.error("An error occurred. Please try again.");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="flex items-center justify-between">
                Course Price
                <Button onClick={toggleEditing} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <div className={cn(
                    "mt-2",
                    "text-sm",
                    (initialData.price === undefined || initialData.price === null) && "text-gray-400 italic"
                )}>
                    {initialData.price !== undefined && initialData.price !== null 
                        ? formatPrice(initialData.price) 
                        : "No price set"}
                </div>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
                        <FormField 
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={isSubmitting}
                                            step="0.01"
                                            placeholder="Price"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button 
                            type="submit"
                            disabled={!isValid || isSubmitting}
                        >
                            Save
                        </Button>
                    </form>
                </Form>
            )}
        </div>
    );
}
