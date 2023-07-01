"use client";

import { useState } from "react";
import Hamburger from "@/app/asset/menu.svg";
import CloseIcon from "@/app/asset/x.svg";
import Link from "next/link";
import useStore from "@/app/hooks/useStore";
import { userLogout } from "@/app/api/auth";
import { useRouter } from "next/navigation";

export default function NavButtons() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <>
            <ul className="hidden w-full max-w-[43vw] justify-center self-stretch sm:flex">
                <Buttons bg_hover />
            </ul>
            {!isMobileMenuOpen ? (
                <div className="mr-4 block sm:hidden">
                    <Hamburger onClick={() => setIsMobileMenuOpen(true)} />
                </div>
            ) : (
                <div className="absolute left-0 top-0 z-[999] flex h-screen w-screen items-center justify-center bg-gray-900">
                    <CloseIcon
                        className="absolute right-4 top-4"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="flex flex-col space-y-20">
                        <Buttons />
                    </div>
                </div>
            )}
        </>
    );
}

export function Buttons({ bg_hover }: { bg_hover?: boolean }) {
    const isLoggedIn = useStore((state) => state.accessToken);
    const logout = useStore((state) => state.logout);

    const router = useRouter();

    const userLogoutApi = async () => {
        try {
            await userLogout();
            logout();
            router.push("/");
        } catch {}
    };

    const notLoggedInRoutes = {
        ورود: "/login",
        جستجو: "/search",
    };
    const loggedInRoutes = {
        جستجو: "/search",
        "علاقه مندی ها": "/favorites",
    };

    return (
        <>
            {isLoggedIn ? (
                <>
                    <li
                        className={`navbar-li ${
                            bg_hover && "hover:bg-red-900"
                        }`}
                        onClick={userLogoutApi}
                    >
                        خروج
                    </li>
                    {Object.entries(loggedInRoutes).map((el, i) => (
                        <li
                            className={`navbar-li ${
                                bg_hover && "hover:bg-red-900"
                            }`}
                            key={i}
                        >
                            <Link href={el[1]}>{el[0]}</Link>
                        </li>
                    ))}
                </>
            ) : (
                <>
                    {Object.entries(notLoggedInRoutes).map((el, i) => (
                        <li
                            className={`navbar-li ${
                                bg_hover && "hover:bg-red-900"
                            }`}
                            key={i}
                        >
                            <Link href={el[1]}>{el[0]}</Link>
                        </li>
                    ))}
                </>
            )}
        </>
    );
}
