"use client";

import { AxiosError } from "axios";
import { Food } from "backend";
import { useEffect, useState } from "react";
import { Search } from "react-feather";
import { AuthError } from "../types/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { searchFood } from "../api";
import AlertBox from "../components/AlertBox";
import Spinner from "../components/LoadingSpinner";
import FoodCard from "../components/FoodCard";

export default function SearchPage() {
    const [searchInput, setSearchInput] = useState("");
    const { data, isError, refetch, isInitialLoading } = useQuery<
        Food[],
        AxiosError<AuthError>
    >(["search", searchInput], () => searchFood(searchInput.trim()), {
        enabled: false,
    });

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (searchInput.trim()) {
                refetch();
            }
        }, 1500);
        return () => clearTimeout(timeOut);
    }, [searchInput]);

    return (
        <div className="mx-auto my-5 flex w-[90vw] max-w-7xl flex-col items-center justify-start overflow-y-auto ">
            <div className="relative flex w-full justify-center">
                <input
                    type="text"
                    className="flex-1 rounded border border-gray-700 px-2 py-1"
                    placeholder="جستجو"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                />
                <div className="absolute left-0 flex h-full items-center justify-center">
                    <Search className="ml-2" />
                </div>
            </div>
            <main className="mx-auto mt-5 flex w-full rounded bg-white p-4">
                {!data &&
                    !isError &&
                    !isInitialLoading &&
                    "برای جستجو عبارت مورد نظر خود را وارد کنید"}
                {isError && (
                    <div className="flex w-full justify-center">
                        <AlertBox
                            message="خطایی رخ داده است"
                            messageType="error"
                        />
                    </div>
                )}
                {isInitialLoading && (
                    <div className="flex w-full justify-center">
                        <Spinner />
                    </div>
                )}
                {data &&
                    (data.length > 0 ? (
                        <div className="mx-auto mt-5 grid w-full grid-cols-1 gap-6 rounded p-4 sm:grid-cols-2 lg:grid-cols-4">
                            {data.map((food, i) => (
                                <FoodCard food={food} key={i} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex w-full justify-center">
                            {"موردی یافت نشد"}
                        </div>
                    ))}
            </main>
        </div>
    );
}
