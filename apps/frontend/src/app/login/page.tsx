"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "@/app/asset/logo.png";
import useStore from "../hooks/useStore";
import { AuthError, loginResponse } from "../types/auth";
import { AxiosError } from "axios";
import { userLogin } from "../api/auth";
import { loginSchema, LoginDto } from "backend";
import { useState } from "react";

// TODO: Error Handling
// TODO: signup

export default function Login() {
    const login = useStore((state) => state.login);
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<LoginDto>({ resolver: zodResolver(loginSchema) });

    const onLogin: SubmitHandler<LoginDto> = () =>
        loginMutation.mutate(getValues());

    const router = useRouter();
    const searchParams = useSearchParams();
    const nextURL: any = searchParams.get("next") || "/";

    const loginMutation = useMutation<
        loginResponse,
        AxiosError<AuthError>,
        LoginDto
    >(
        (loginDto: LoginDto) => userLogin(loginDto),

        {
            onSuccess(data) {
                login(data.accessToken);
                console.log(nextURL);
                router.push(nextURL);
            },
        }
    );

    const errorHandler = (error) => console.log(error);

    const [errorMessage, setErrorMessage] = useState("");

    return (
        <div className="mx-auto mt-[10vh] flex w-[90vw] flex-col items-center justify-center sm:w-[40vmin]">
            {errorMessage && (
                <div className="w-full bg-red-500 py-5 text-left text-red-800">
                    {Object.entries(errors).map(
                        ([key, value]) => `${key}: ${value.message}`
                    )}
                </div>
            )}
            <Image src={Logo} alt="easy cook logo" className="w-[20vmin]" />
            <form
                className="mt-4 flex w-full flex-col space-y-6"
                dir="ltr"
                onSubmit={handleSubmit(onLogin, errorHandler)}
            >
                <input
                    className="rounded-sm px-2 py-1"
                    type="text"
                    placeholder="email"
                    required
                    {...register("email")}
                />
                <input
                    className="rounded-sm px-2 py-1"
                    type="password"
                    placeholder="password"
                    required
                    {...register("password")}
                />
                <div className="mx-auto flex w-1/4 flex-col justify-center space-y-4">
                    <button
                        type="submit"
                        className="w-full rounded-md bg-primary px-1 py-2 text-white"
                    >
                        ورود
                    </button>
                    <button
                        type="button"
                        className="w-full rounded-md bg-primary px-1 py-2 text-white"
                        onClick={() => {
                            console.log("sign up");
                        }}
                    >
                        عضویت
                    </button>
                </div>
            </form>
        </div>
    );
}
