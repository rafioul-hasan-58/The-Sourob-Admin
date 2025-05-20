'use server';

import { revalidatePath } from "next/cache";
import { ParamValue } from "next/dist/server/request/params";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const addProject = async (blogData: FieldValues) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/projects/add-project`,
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
export const getAllProjects = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/projects/get-all-projects`,
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
export const getSingleProject = async (id: ParamValue) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/projects/get-single-project/${id}`,
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
export const deleteProject = async (id: ParamValue) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/projects/delete-project/${id}`,
            {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value,

                },
            }
        );
        const result = await res.json();
        revalidatePath('/dashboard/all-projects')
        return result;
    } catch (error) {
        return Error(error as string);
    }
};
export const updateProject = async (projectData: {
    id: string,
    data: FieldValues
}) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/projects/update-project/${projectData.id}`,
            {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
                body: JSON.stringify(projectData.data),
            }
        );
        const result = await res.json();
        return result;
    } catch (error) {
        return Error(error as string);
    }
};
export const removeProjectImage = async (data: { id: ParamValue, image: string }) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/projects/remove-image/${data.id}`,
            {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
                body: JSON.stringify({ image: data.image })
            }
        );
        const result = await res.json();
        revalidatePath('/dashboard/all-projects')
        return result;
    } catch (error) {
        return Error(error as string);
    }
};