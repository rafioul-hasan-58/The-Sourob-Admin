"use client";
import { Form } from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { loginUser } from "@/services/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AFormInput from "../form/AFormInput";

const LoginForm = () => {
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const {
        formState: { isSubmitting },
        handleSubmit
    } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { email, password } = data;
        const loginData = {
            email,
            password,
        };
        try {
            const res = await loginUser(loginData);
            console.log(res);
            if (res.success) {
                toast.success('Admin logged in');
                router.push('/dashboard/messages')
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const commonWidth = "lg:w-[400px] w-[340px]";
    return (
        <div className="lg:max-w-3xl lg:w-full lg:mx-auto lg:px-8 px-3">
            <h1 className="text-center text-3xl font-bold text-purple-400">Welcome To Your World!</h1>
            <Form {...form}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 lg:w-[480px] w-full p-3">
                    <div
                        className={`space-y-1 border-2 border-purple-500 border-b-0 rounded-2xl pt-6`}>
                        <h1 className="text-center text-2xl text-purple-400">
                            Enter You Credentials
                        </h1>
                        <div className="w-full flex justify-center p-4">
                            <AFormInput
                                name="email"
                                label="Email"
                                placeholder="Email"
                                control={form.control}
                                className={`focus:outline-none rounded-none border ${commonWidth} border-purple-500 text-purple-500`}
                                required
                            />
                        </div>
                        <div className="w-full flex justify-center ">
                            <AFormInput
                                name="password"
                                label="Password"
                                placeholder="********"
                                control={form.control}
                                className={`focus:outline-none rounded-none ${commonWidth}  border border-purple-500 text-purple-500`}
                                type="password"
                                required
                            />
                        </div>
                        <div className="flex justify-center py-2">
                            <Button
                                type="submit"
                                className={`${commonWidth} rounded-none mt-3 text-white bg-gradient-to-r from-purple-600 to-pink-500 cursor-pointer`}
                            >
                                {isSubmitting ? <Loader className="animate-spin" /> : "Login"}
                            </Button>

                        </div>
                        <h1 className="text-center text-purple-500">
                            Forgotten Password?Click
                        </h1>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default LoginForm;