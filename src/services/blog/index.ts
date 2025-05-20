'use server';

import { revalidatePath } from "next/cache";
import { ParamValue } from "next/dist/server/request/params";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const writeBlog = async (blogData: FieldValues) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/write-blog`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
                body: JSON.stringify(blogData),
            }
        );
        const result = await res.json();
        return result;
    } catch (error) {
        return Error(error as string);
    }
};

export const getAllBlogs = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/get-all-blogs`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        const result = await res.json();
        return result;
    } catch (error) {
        return Error(error as string);
    }
};
export const getSingleBlog = async (id: ParamValue) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/get-single-blog/${id}`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        const result = await res.json();
        return result;
    } catch (error) {
        return Error(error as string);
    }
};
export const deleteBlog = async (id: ParamValue) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/delete-blog/${id}`,
            {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value,

                },
            }
        );
        revalidatePath('/dashboard/all-blogs')
        const result = await res.json();
        return result;
    } catch (error) {
        return Error(error as string);
    }
};
export const editBlog = async (blogData: {
    id: string,
    data: FieldValues
}) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/edit-blog/${blogData.id}`,
            {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value,

                },
                body: JSON.stringify(blogData.data),
            }
        );
        const result = await res.json();
        return result;
    } catch (error) {
        return Error(error as string);
    }
};
export const removeBlogImage = async (data: { id: ParamValue, image: string }) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/remove-image/${data.id}`,
            {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
                body: JSON.stringify({ image: data.image })
            }
        );
        revalidatePath(`/all-blogs/update/${data.id}`)
        const result = await res.json();
        return result;
    } catch (error) {
        return Error(error as string);
    }
};