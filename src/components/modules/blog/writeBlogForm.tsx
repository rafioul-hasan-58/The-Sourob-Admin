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
import { writeBlog } from "@/services/blog";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const WriteBlogForm = () => {
    const [ImageUrls, setImageUrls] = useState<File | File[]>([]);
    const [previewImages, setPreviewImages] = useState<(string | File)[]>([]);
    const { uploadImagesToCloudinary } = useImageUploader();
    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            images: [],
        },
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = form;
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const images = await uploadImagesToCloudinary(ImageUrls, true);

        const blogData = {
            ...data,
            images,
        };
        try {
            const res = await writeBlog(blogData);
            console.log(res);
            if (res.success) {
                toast.success(res.message);
                setImageUrls([]);
                setPreviewImages([]);
                form.reset();
                window.location.reload();

            } else {
                toast.error(res.message)
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className=" lg:max-w-5xl lg:mx-auto">
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h1 className="text-3xl font-bold text-center my-5 text-purple-500">Write your blog</h1>
                    </div>
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-purple-500">
                                Start Writing Your Blog
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
                                    {isSubmitting ? "Uploading..." : "Upload"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    );
};

export default WriteBlogForm;