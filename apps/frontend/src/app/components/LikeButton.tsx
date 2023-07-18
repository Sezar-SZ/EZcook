"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Food } from "backend";
import { AuthError } from "../types/auth";
import usePrivateAxios from "../hooks/usePrivateAxios";
import { Heart } from "react-feather";
import useStore from "../hooks/useStore";
import { useEffect, useState } from "react";

export default function LikeButton({ foodId }: { foodId: string }) {
    const privateAxios = usePrivateAxios();
    const accessToken = useStore((state) => state.accessToken);

    const [isLiked, setIsLiked] = useState<boolean | null>(null);

    const getIfLike = async () => {
        const { data } = await privateAxios.get(`/likes/${foodId}`);
        return data;
    };

    const getIfFavorite = useQuery<Food | Object, AxiosError<AuthError>>(
        ["isLiked", foodId],
        getIfLike,
        { enabled: false }
    );

    useEffect(() => {
        if (getIfFavorite.data) {
            if (Object.hasOwn(getIfFavorite.data, "id")) setIsLiked(true);
            else setIsLiked(false);
        }
    }, [getIfFavorite.data]);

    const likeFood = useMutation<any, AxiosError<AuthError>>(
        () => privateAxios.post(`/likes/${foodId}`),
        {
            onSuccess() {
                if (isLiked !== null) setIsLiked(!isLiked);
                getIfFavorite.refetch();
            },
        }
    );

    useEffect(() => {
        if (Array.isArray(accessToken) && accessToken.length > 0)
            getIfFavorite.refetch();
    }, [accessToken]);

    return (
        <>
            {accessToken && isLiked !== null ? (
                <div>
                    {isLiked ? (
                        <div
                            className={`flex cursor-pointer items-center justify-end text-primary ${
                                likeFood.isLoading && "cursor-wait text-red-500"
                            }`}
                            onClick={() => {
                                if (
                                    !likeFood.isLoading &&
                                    !getIfFavorite.isLoading
                                )
                                    likeFood.mutate();
                            }}
                        >
                            حذف از علاقه مندی ها
                        </div>
                    ) : (
                        <div
                            className={`flex cursor-pointer items-center justify-end text-primary ${
                                likeFood.isLoading && "cursor-wait text-red-500"
                            }`}
                            onClick={() => {
                                if (!likeFood.isLoading) likeFood.mutate();
                            }}
                        >
                            افزودن به علاقه مندی ها
                            {<Heart className="mr-2 w-4 text-primary " />}
                        </div>
                    )}
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
