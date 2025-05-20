"use client";
import AFormImageUpload from "@/components/modules/form/AFormImageUpload";
import AFormInput from "@/components/modules/form/AFormInput";
import AFormTextarea from "@/components/modules/form/AFormTextarea";
import { PageHeader } from "@/components/singles/Pageheader";
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
import { removeProjectImage, updateProject } from "@/services/project";
import { IProject } from "@/types/project";
import { Label } from "@radix-ui/react-label";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface IprojectData {
    project: IProject
}
const UpdateProjectForm = ({ project }: IprojectData) => {
    const router = useRouter();
    const [ImageUrls, setImageUrls] = useState<File | File[]>([]);
    const [previewImages, setPreviewImages] = useState<(string | File)[]>([]);
    const { uploadImagesToCloudinary } = useImageUploader();
    const form = useForm({
        defaultValues: {
            title: project?.title ?? "",
            description: project?.description ?? "",
            github_link_client: project?.github_link_client ?? "",
            github_link_server: project?.github_link_server ?? "",
            live_link: project?.live_link ?? "",
            images: [],
        },
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = form;
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const newImages = await uploadImagesToCloudinary(ImageUrls, true);
        const images = [
            ...newImages,
            ...project?.images
        ]
        const projectData = {
            ...data,
            images,
        };
        const updateData = {
            id: project._id,
            data: projectData
        }
        try {
            const res = await updateProject(updateData);
            // Example usage if you have updateProject:
            if (res.success) {
                toast.success(res.message);
                setImageUrls([]);
                setPreviewImages([]);
                router.push('/dashboard/all-projects')
            } else {
                toast.error(res.message)
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleImageDelete = async (image: string) => {
        try {
            const opData = {
                image,
                id: project._id,
            };
            const res = await removeProjectImage(opData);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className=" lg:max-w-5xl lg:mx-auto  my-5 ">
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className=" text-purple-500 flex items-center justify-between">
                        <PageHeader
                            title="Update Your Project"
                            description="Have a unique project  to share? Put it into words and inspire others with your website!"
                        />
                    </div>
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-purple-500">
                                Start Updating Your Project
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
                            <AFormInput
                                name="live_link"
                                placeholder="Live Link"
                                label="Live link(Client)"
                                control={form.control}
                                className="border-purple-500 hover:border- mb-4  rounded-none"
                            />
                            <AFormInput
                                name="github_link_client"
                                placeholder="Github Link Client"
                                label="Github(Client)"
                                control={form.control}
                                className="border-purple-500 hover:border- mb-4  rounded-none"
                            />
                            <AFormInput
                                name="github_link_server"
                                placeholder="Github Link Server"
                                label="Github(Server)"
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
                            {project.images?.length > 0 && (
                                <>
                                    <Label htmlFor="image" className="text-purple-500 font-semibold text-[14px]">
                                        Current Images
                                        <span className="text-purple-500 text-xl relative top-0.5">
                                            *
                                        </span>
                                    </Label>
                                    <div className="border border-purple-500 p-2 grid grid-cols-4 border-dashed">
                                        {project?.images?.map((image: string) => (
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
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-0 right-1 rounded-full shadow-md  hover:scale-110 transition-transform cursor-pointer">
                                                    <Trash2 size={14} className=" text-white" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="images" className="text-purple-500 font-semibold text-[14px]">
                                    New Images{" "}
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
                                    {isSubmitting ? "Updating..." : "Update"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    );
};

export default UpdateProjectForm;