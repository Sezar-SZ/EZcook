"use client";

import { useEffect, useState } from "react";
import useStore from "@/app/hooks/useStore";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../api/client";
import { AuthError, RefreshResponse } from "../types/auth";
import { AxiosError } from "axios";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const login = useStore((state) => state.login);
    const logout = useStore((state) => state.logout);
    const { isLoading, isError, data, error } = useQuery<
        RefreshResponse,
        AxiosError<AuthError>
    >(["checkAuth"], checkAuth, { retry: false, refetchOnWindowFocus: false });

    useEffect(() => {
        if (data?.accessToken) login(data.accessToken);
        if (error?.response?.status === 401) {
            logout();
        }
    }, [isLoading, isError, data, error]);

    return (
        <>
            {(data || (isError && error.response?.status === 401)) && children}
            {isLoading && <div></div>}
            {isError && error.response?.status !== 401 && (
                <h1 className="w-screen text-left text-red-700" dir="ltr">
                    Something Went Wrong...
                </h1>
            )}
        </>
    );
}

// https://tanstack.com/query/v4/docs/react/guides/ssr
