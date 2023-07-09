"use client";

import Image from "next/image";
import { Food } from "backend";
import { redirect, useRouter, useParams } from "next/navigation";
import { formatTime } from "../../utils";
import usePrivateAxios from "@/app/hooks/usePrivateAxios";
import { isError, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthError } from "@/app/types/auth";
import { useEffect, useState } from "react";
import AlertBox from "@/app/components/AlertBox";
import Spinner from "@/app/components/LoadingSpinner";
import useStore from "@/app/hooks/useStore";

export default async function FoodPage() {
    // TODO: the params cause some multiple requests...
    const params = useParams();
    const [foodSlug, setFoodSlug] = useState("");

    const accessToken = useStore((state) => state.accessToken);
    useEffect(() => {
        if (accessToken?.length === 0) router.push("/login?next=admin");
    }, [accessToken]);

    useEffect(() => {
        if (!foodSlug && params["foodSlug"]) {
            setFoodSlug(params.foodSlug);
            setId(params.foodSlug.split("/")[0]);
            setFoodNameSlug(params.foodSlug.split("/")[1] || "");
        }
    }, [params]);

    const router = useRouter();

    const privateAxios = usePrivateAxios();

    const getFood = async () => {
        const { data } = await privateAxios.get(`/foods/unapprove/${id}`);
        return data;
    };

    const [imgSrc, setImgSrc] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [id, setId] = useState("");
    const [foodNameSlug, setFoodNameSlug] = useState("");

    const { data, isLoading, error, refetch, isInitialLoading } = useQuery<
        Food,
        AxiosError<AuthError>
    >(["food", id], getFood, { enabled: false, retry: false });

    useEffect(() => {
        if (id) {
            refetch();
            console.log("doing refetch", id);
        }
    }, [id]);

    useEffect(() => {
        console.log(data);
        if (data) {
            console.log("food name", decodeURI(foodNameSlug));

            if (data.slug !== decodeURI(foodNameSlug))
                redirect(`/admin/${id}/${data.slug}`);
            setImgSrc(
                `${process.env.NEXT_PUBLIC_BASE_URL}/images${data.food_picture}`
            );
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            if (error.response?.status === 403)
                setErrorMessage("شما مجوز دسترسی به این بخش را ندارید");
            else setErrorMessage("خطایی رخ داده است");
        } else setErrorMessage("");
    }, [error]);

    return (
        <>
            {isLoading && (
                <div className="mt-4 w-full">
                    <Spinner />
                </div>
            )}
            {errorMessage && (
                <div className="mt-4 w-full">
                    <AlertBox messageType="error" message={errorMessage} />
                </div>
            )}
            {data && (
                <div className="mx-auto mt-4 flex w-[90vw] max-w-7xl flex-col items-center justify-start bg-white p-2">
                    <div className="flex w-full flex-col-reverse justify-center md:flex-row">
                        <div className="mt-6 flex flex-1 flex-col items-center justify-center space-y-4 md:mt-0">
                            <h1 className="text-2xl text-red-900">
                                {data.food_name}
                            </h1>
                            <h2 className="text-base text-red-950">
                                زمان پخت: {formatTime(data.cooking_duration)}
                            </h2>
                            <h2 className="text-base text-red-950">
                                برای {data.serves} نفر
                            </h2>
                        </div>
                        <div className="relative flex aspect-video min-h-[35vh] flex-1">
                            <Image
                                src={imgSrc}
                                alt={data.food_name}
                                fill
                                className="w-full rounded object-cover"
                            />
                        </div>
                    </div>
                    <table className="mt-5 w-[90%] table-fixed border-collapse border border-slate-500 xl:w-1/2">
                        <thead>
                            <tr>
                                <th className="border border-gray-700 bg-red-100 py-2">
                                    ماده اولیه
                                </th>
                                <th className="border border-gray-700 bg-red-100 py-2">
                                    مقدار
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.ingredients
                                .split("\n")
                                .map((ingredient, indx) => {
                                    const [val, amount] = ingredient.split(":");
                                    return (
                                        <tr key={indx}>
                                            <td className="border border-gray-700 bg-red-100 py-1 text-center">
                                                {val}
                                            </td>
                                            <td className="border border-gray-700 bg-red-100 py-1 text-center">
                                                {amount}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                    <h2 className="mt-3 w-[95%] text-right text-xl">
                        دستور پخت
                    </h2>
                    <p className="w-[95%] whitespace-pre-wrap text-justify leading-loose">
                        {data.food_recipe}
                    </p>
                </div>
            )}
        </>
    );
}
