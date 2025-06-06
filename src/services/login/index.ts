/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

export const loginUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const result = await res.json();
        if (result?.success) {
            (await cookies()).set("accessToken", result?.data?.accessToken);
        }
        return result;
    } catch (error) {
        console.log(error);
        return Error(error as string);
    }
};

export const getUser = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    let decodedData = null;
    if (accessToken) {
        decodedData = await jwtDecode(accessToken);
        return decodedData;
    } else {
        return null;
    }
};

export const getMyProfile = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/get-my-profile`,
            {
                method: "GET",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );

        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};
export const logoutUser = async () => {
  try {
    (await cookies()).delete("accessToken");
  } catch (error) {
    console.log(error);
    return Error(error as string);
  }
};