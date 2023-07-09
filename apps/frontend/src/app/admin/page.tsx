"use client";

import { useRouter } from "next/navigation";
import useStore from "../hooks/useStore";
import usePrivateAxios from "../hooks/usePrivateAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Food } from "backend";
import { AuthError } from "../types/auth";
import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import AlertBox from "../components/AlertBox";
import Spinner from "../components/LoadingSpinner";

import { Check, Trash2 } from "react-feather";
import Link from "next/link";

export default function AdminPage() {
    const accessToken = useStore((state) => state.accessToken);
    useEffect(() => {
        if (accessToken?.length === 0) router.push("/login?next=admin");
    }, [accessToken]);

    const router = useRouter();

    const privateAxios = usePrivateAxios();

    const [errorMessage, setErrorMessage] = useState("");
    const [selectedTab, setSelectedTab] = useState<"approved" | "unApproved">(
        "unApproved"
    );

    const getAllFoods = async () => {
        const { data } = await privateAxios.get("/foods");
        return data;
    };

    const { data, error, isError, isLoading, refetch } = useQuery<
        Food[],
        AxiosError<AuthError>
    >(["AdminGetAll"], getAllFoods, { retry: false });

    const reviewedFoods = useMemo(() => {
        return data?.filter((food) => food.isReviewed);
    }, [data]);
    const unReviewedFoods = useMemo(() => {
        return data?.filter((food) => food.isReviewed === false);
    }, [data]);

    useEffect(() => {
        if (error) {
            if (error.response?.status === 403)
                setErrorMessage("شما مجوز دسترسی به این بخش را ندارید");
            else setErrorMessage("خطایی رخ داده است");
        } else setErrorMessage("");
    }, [error]);

    const [mutationId, setMutationId] = useState("");

    const approveFood = useMutation<any, AxiosError<AuthError>, string>(
        (foodId: string) => privateAxios.post(`/foods/approve/${foodId}`),
        {
            onSuccess() {
                setErrorMessage("");
                setMutationId("");
                refetch();
            },
            onError() {
                setMutationId("");
                setErrorMessage("خطایی رخ داده است");
            },
        }
    );
    const deleteFood = useMutation<any, AxiosError<AuthError>, string>(
        (foodId: string) => privateAxios.delete(`/foods/${foodId}`),
        {
            onSuccess() {
                setErrorMessage("");
                setMutationId("");
                refetch();
            },
            onError() {
                setMutationId("");
                setErrorMessage("خطایی رخ داده است");
            },
        }
    );

    return (
        <div className="mx-auto my-5 flex w-[90vw] max-w-7xl flex-col items-center justify-start overflow-y-auto ">
            {errorMessage && (
                <AlertBox message={errorMessage} messageType="error" />
            )}
            {(isLoading || deleteFood.isLoading || approveFood.isLoading) && (
                <div className="overflow-hidden">
                    <Spinner />
                </div>
            )}
            {data && reviewedFoods && unReviewedFoods && (
                <div className="mx-auto mt-5 flex w-full flex-col justify-start rounded bg-white p-4">
                    <div className="mb-4 flex w-full justify-center">
                        <div
                            className={`flex flex-1 cursor-pointer justify-center border-l bg-primary py-3 text-white ${
                                selectedTab === "unApproved" && "bg-red-700"
                            }`}
                            onClick={() => setSelectedTab("unApproved")}
                        >
                            <span>تایید نشده</span>
                        </div>
                        <div
                            className={`flex flex-1 cursor-pointer justify-center border-r bg-primary py-3 text-white ${
                                selectedTab === "approved" && "bg-red-700"
                            }`}
                            onClick={() => setSelectedTab("approved")}
                        >
                            <span>تایید شده</span>
                        </div>
                    </div>
                    {selectedTab === "approved" ? (
                        reviewedFoods.length > 0 ? (
                            reviewedFoods?.map((food, indx) => (
                                <div
                                    key={indx}
                                    className={`flex w-full justify-between p-4 ${
                                        indx !== reviewedFoods.length - 1 &&
                                        "border-b"
                                    }`}
                                >
                                    <Link
                                        href={`/admin/${food.id}/${food.slug}`}
                                    >
                                        {food.food_name}
                                    </Link>
                                    <div className="flex items-center justify-center">
                                        {mutationId !== food.id ? (
                                            <Trash2
                                                onClick={() => {
                                                    if (
                                                        !approveFood.isLoading &&
                                                        !deleteFood.isLoading
                                                    ) {
                                                        setMutationId(food.id);
                                                        deleteFood.mutate(
                                                            food.id
                                                        );
                                                    }
                                                }}
                                                className="mx-2 w-4 cursor-pointer text-red-700"
                                            />
                                        ) : (
                                            <Spinner />
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span className="w-full p-2 text-center">
                                غذایی یافت نشد
                            </span>
                        )
                    ) : unReviewedFoods.length > 0 ? (
                        unReviewedFoods?.map((food, indx) => (
                            <div
                                key={indx}
                                className={`flex w-full justify-between p-4 ${
                                    indx !== unReviewedFoods.length - 1 &&
                                    "border-b"
                                }`}
                            >
                                <Link href={`/admin/${food.id}/${food.slug}`}>
                                    {food.food_name}
                                </Link>
                                <div className="flex items-center justify-center">
                                    {mutationId !== food.id ? (
                                        <>
                                            <Check
                                                onClick={() => {
                                                    if (
                                                        !approveFood.isLoading &&
                                                        !deleteFood.isLoading
                                                    ) {
                                                        setMutationId(food.id);
                                                        approveFood.mutate(
                                                            food.id
                                                        );
                                                    }
                                                }}
                                                className="mx-2 w-4 cursor-pointer text-green-700"
                                            />
                                            <Trash2
                                                onClick={() => {
                                                    if (
                                                        !approveFood.isLoading &&
                                                        !deleteFood.isLoading
                                                    ) {
                                                        deleteFood.mutate(
                                                            food.id
                                                        );
                                                    }
                                                }}
                                                className="mx-2 w-4 cursor-pointer text-red-700"
                                            />
                                        </>
                                    ) : (
                                        <Spinner />
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <span className="w-full p-2 text-center">
                            غذایی یافت نشد
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
