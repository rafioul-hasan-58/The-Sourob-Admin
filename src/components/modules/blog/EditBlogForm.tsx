"use client";
import AFormImageUpload from "@/components/modules/form/AFormImageUpload";
import AFormInput from "@/components/modules/form/AFormInput";
import AFormTextarea from "@/components/modules/form/AFormTextarea";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import useImageUploader from "@/components/utils/useImageUploader";
import { editBlog, removeBlogImage } from "@/services/blog";
import { IBlog } from "@/types/blog";
import { Label } from "@radix-ui/react-label";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface TBlogUpdate {
    blog: IBlog
}
const EditBlogForm = ({ blog }: TBlogUpdate) => {
    const router=useRouter();
    const [ImageUrls, setImageUrls] = useState<File | File[]>([]);
    const [previewImages, setPreviewImages] = useState<(string | File)[]>([]);
    const { uploadImagesToCloudinary } = useImageUploader();
    const form = useForm({
        defaultValues: {
            title: blog?.title ?? "",
            description: blog?.description ?? "",
            images: blog?.images ?? [],
        },
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = form;
    const handleImageDelete = async (image: string) => {
        const opData = {
            id: blog._id,
            image
        }
        try {
            await removeBlogImage(opData);
        } catch (err) {
            console.log(err);
        }
    }
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const newImages = await uploadImagesToCloudinary(ImageUrls, true);
        const images = [
            ...newImages,
            ...blog?.images
        ]
        const blogData = {
            ...data,
            images,
        };
        const updateData = {
            id: blog._id,
            data: blogData
        }
        try {
            const res = await editBlog(updateData);
            if (res.success) {
                toast.success('Blog Updated successfully');
                router.push('/dashboard/all-blogs');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className=" lg:max-w-5xl lg:mx-auto">
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h1 className="text-3xl font-bold text-center my-5 text-purple-500">Edit your blog</h1>
                    </div>
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-purple-500">
                                Start Editing Your Blog
                            </CardTitle>
                            <CardDescription>
                                Add a catchy title and give readers a glimpse of what your blog
                                is about.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AFormInput
                                name="title"
                                placeholder="Title"
                                label="Title"
                                control={form.control}
                                className="border-purple-500 hover:border- mb-4  rounded-none"
                            />
                            <div>
                                <Label htmlFor="image" className="text-purple-500 font-semibold text-[14px]">
                                    Description{" "}
                                    <span className="text-purple-500 text-xl relative top-0.5">
                                        *
                                    </span>
                                </Label>
                                <AFormTextarea
                                    name="description"
                                    placeholder="Describe your project"
                                    control={form.control}
                                    className="w-full border-purple-500 hover:border- mb-4  rounded-none"
                                />
                            </div>
                            {blog?.images?.length > 0 && (
                                <>
                                    <Label htmlFor="image" className="text-purple-500 font-semibold text-[14px]">
                                        Current Images
                                        <span className="text-purple-500 text-xl relative top-0.5">
                                            *
                                        </span>
                                    </Label>
                                    <div className="border border-purple-500 p-2 grid grid-cols-4 border-dashed">
                                        {blog?.images?.map((image: string) => (
                                            <div key={image} className="relative">
                                                <Image
                                                    src={image}
                                                    alt="image"
                                                    width={200}
                                                    height={200}
                                                    className="rounded-sm"
                                                />
                                                <Button
                                                    onClick={() => handleImageDelete(image)}
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-0 right-3 rounded-full shadow-md  hover:scale-110 transition-transform cursor-pointer">
                                                    <Trash2 size={14} className=" text-white" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="images" className="text-purple-500 font-semibold text-[14px]">
                                    Images{" "}
                                    <span className="text-purple-500 text-xl relative top-0.5">
                                        *
                                    </span>
                                </Label>
                                <div className="border border-dashed p-12 text-center border-purple-500 transition-colors cursor-pointer">
                                    <AFormImageUpload
                                        setPreviewImages={setPreviewImages}
                                        previewImages={previewImages}
                                        control={form.control}
                                        name="images"
                                        multiple={true}
                                        onImageUpload={setImageUrls}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="mt-4 rounded-none bg-purple-500 cursor-pointer">
                                    {isSubmitting ? "Editing..." : "Edit"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    );
};

export default EditBlogForm;