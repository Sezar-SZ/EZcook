"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "@/app/asset/logo.png";
import useStore from "../hooks/useStore";
import { AuthError, loginResponse } from "../types/auth";
import { AxiosError } from "axios";
import { userLogin, userSignup } from "../api/client";
import { loginSchema, LoginDto } from "backend";
import { useState } from "react";
import AlertBox, { MessageType } from "../components/AlertBox";

export default function Login() {
    const login = useStore((state) => state.login);
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<LoginDto>({ resolver: zodResolver(loginSchema) });

    const onLogin: SubmitHandler<LoginDto> = () => {
        setMessage("");
        loginMutation.mutate(getValues());
    };
    const onSignup: SubmitHandler<LoginDto> = () => {
        setMessage("");
        signupMutation.mutate(getValues());
    };

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
                router.push(nextURL);
            },
            onError(error) {
                setMessageType("error");
                if (error.response?.status === 401)
                    setMessage("invalid email or password");
            },
        }
    );
    const signupMutation = useMutation<
        loginResponse,
        AxiosError<AuthError>,
        LoginDto
    >(
        (loginDto: LoginDto) => userSignup(loginDto),

        {
            onSuccess(data) {
                login(data.accessToken);
                router.push(nextURL);
            },
            onError(error) {
                setMessageType("error");
                if (error.response?.status === 401)
                    setMessage(error.response.data.error!);
            },
        }
    );

    const errorHandler = (error: FieldErrors) => {
        let errorMessage = "";
        Object.entries(error).forEach(
            ([key, value]) => (errorMessage += `${key}: ${value?.message}\n`)
        );
        setMessage(errorMessage);
    };

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<MessageType>("error");

    return (
        <div className="mx-auto mt-[10vh] flex w-[90vw] flex-col items-center justify-center sm:w-[40vmin]">
            {message && (
                <AlertBox message={message} messageType={messageType} />
            )}
            <Image
                src={Logo}
                alt="easy cook logo"
                className="mt-4 w-[20vmin]"
            />
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
                        disabled={loginMutation.isLoading}
                        className="w-full rounded-md bg-primary px-1 py-2 text-white disabled:bg-red-500"
                    >
                        ورود
                    </button>
                    <button
                        type="button"
                        disabled={signupMutation.isLoading}
                        className="w-full rounded-md bg-primary px-1 py-2 text-white disabled:bg-red-500"
                        onClick={handleSubmit(onSignup, errorHandler)}
                    >
                        عضویت
                    </button>
                </div>
            </form>
        </div>
    );
}
