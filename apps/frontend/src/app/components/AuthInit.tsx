"use client";

import { useEffect } from "react";
import { config } from "../utils/config";
import useStore from "@/app/hooks/useStore";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../api/auth";
import { AuthError, RefreshResponse } from "../types/auth";
import { AxiosError } from "axios";

export default function AuthInit({ children }: { children: React.ReactNode }) {
    const login = useStore((state) => state.login);
    const authChecked = useStore((state) => state.authChecked);
    const setAuthChecked = useStore((state) => state.setAuthChecked);
    const { isLoading, isFetching, isError, data, error } = useQuery<
        RefreshResponse,
        AxiosError<AuthError>
    >(["checkAuth"], checkAuth, { retry: false, refetchOnWindowFocus: false });

    useEffect(() => {
        if (data) {
            if (data.accessToken) login(data.accessToken);
        }
        setAuthChecked();
    }, [data]);

    return (
        <>
            {(data || (isError && error.response?.status === 401)) &&
                authChecked === true &&
                children}
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
