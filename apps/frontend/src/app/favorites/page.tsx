"use client";
import { Food } from "backend";
import AlertBox from "../components/AlertBox";
import FoodCard from "../components/FoodCard";
import Spinner from "../components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthError } from "../types/auth";
import useStore from "../hooks/useStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import usePrivateAxios from "../hooks/usePrivateAxios";
import { favoriteListResponse } from "../types/likeResponse";

export default function FavoritesPage() {
    const accessToken = useStore((state) => state.accessToken);
    useEffect(() => {
        if (accessToken?.length === 0) router.push("/login?next=favorites");
    }, [accessToken]);

    const router = useRouter();

    const privateAxios = usePrivateAxios();

    const getFavorites = async () => {
        const { data } = await privateAxios.get("/likes");
        return data;
    };

    const { data, isError, isLoading } = useQuery<
        favoriteListResponse,
        AxiosError<AuthError>
    >(["favorites"], getFavorites, { cacheTime: 0 });

    return (
        <div className="mx-auto my-5 flex w-[90vw] max-w-7xl flex-col items-center justify-start overflow-y-auto ">
            <main className="mx-auto mt-5 flex w-full flex-col rounded bg-white p-4">
                <h1 className="text-center text-2xl text-primary">
                    علاقه مندی ها
                </h1>
                <span className="mx-auto mt-2 h-[2px] w-3/4 rounded bg-primary"></span>
                {isError && (
                    <div className="flex w-full justify-center">
                        <AlertBox
                            message="خطایی رخ داده است"
                            messageType="error"
                        />
                    </div>
                )}
                {isLoading && (
                    <div className="flex w-full justify-center">
                        <Spinner />
                    </div>
                )}
                {data &&
                    (data.length > 0 ? (
                        <div className="mx-auto mt-5 grid w-full grid-cols-1 gap-6 rounded p-4 sm:grid-cols-2 lg:grid-cols-4">
                            {data.map((like, i) => (
                                <FoodCard food={like.food} key={i} />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-3 flex w-full justify-center">
                            {"موردی یافت نشد"}
                        </div>
                    ))}
            </main>
        </div>
    );
}
