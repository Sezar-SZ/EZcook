"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Menu, X } from "react-feather";
import useStore from "@/app/hooks/useStore";
import { userLogout } from "@/app/api/client";
import { useRouter } from "next/navigation";

export default function NavButtons() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <>
            <ul className="hidden w-full max-w-[43vw] justify-center self-stretch sm:flex">
                <Buttons bg_hover closeMenu={setIsMobileMenuOpen} />
            </ul>
            {!isMobileMenuOpen ? (
                <div className="mr-4 block sm:hidden">
                    <Menu onClick={() => setIsMobileMenuOpen(true)} />
                </div>
            ) : (
                <div className="absolute left-0 top-0 z-[999] flex h-screen w-screen items-center justify-center bg-gray-900">
                    <X
                        className="absolute right-4 top-4"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="flex flex-col space-y-20">
                        <Buttons closeMenu={setIsMobileMenuOpen} />
                    </div>
                </div>
            )}
        </>
    );
}

export function Buttons({
    bg_hover,
    closeMenu,
}: {
    bg_hover?: boolean;
    closeMenu: Dispatch<SetStateAction<boolean>>;
}) {
    const accessToken = useStore((state) => state.accessToken);
    const logout = useStore((state) => state.logout);

    const router = useRouter();

    const userLogoutApi = async () => {
        try {
            await userLogout();
            logout();
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    const buttonClicked = (href: string) => {
        closeMenu(false);
        router.push(href);
    };

    const notLoggedInRoutes = {
        ورود: "/login",
        جستجو: "/search",
    };
    const loggedInRoutes = {
        جستجو: "/search",
        "ثبت غذا": "/create",
        "علاقه مندی ها": "/favorites",
    };

    return (
        <>
            {Array.isArray(accessToken) && accessToken.length > 0 ? (
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
                            key={i}
                            className={`navbar-li ${
                                bg_hover && "hover:bg-red-900"
                            }`}
                            onClick={() => buttonClicked(el[1])}
                        >
                            {el[0]}
                        </li>
                    ))}
                </>
            ) : (
                <>
                    {Object.entries(notLoggedInRoutes).map((el, i) => (
                        <li
                            key={i}
                            className={`navbar-li ${
                                bg_hover && "hover:bg-red-900"
                            }`}
                            onClick={() => buttonClicked(el[1])}
                        >
                            {el[0]}
                        </li>
                    ))}
                </>
            )}
        </>
    );
}
