import { ParamValue } from "next/dist/server/request/params";
import { cookies } from "next/headers";

export const getAllMessages = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/messages/get-all-messages`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value,

                },
            }
        );
        const result = await res.json();
        return result;
    } catch (error) {
        return Error(error as string);
    }
};
export const getSingleMessage = async (id: ParamValue) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/messages/get-single-message/${id}`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value,

                },
            }
        );
        const result = await res.json();
        return result;
    } catch (error) {
        return Error(error as string);
    }
};
export const deleteMessage = async (id: ParamValue) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/messages/remove-message/${id}`,
            {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value,

                },
            }
        );
        const result = await res.json();
        return result;
    } catch (error) {
        return Error(error as string);
    }
};