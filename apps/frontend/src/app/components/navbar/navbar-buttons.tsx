"use client";

import { useState } from "react";
import Hamburger from "@/app/asset/menu.svg";
import CloseIcon from "@/app/asset/x.svg";
import Link from "next/link";

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
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
            {isLoggedIn ? (
                <>
                    <li
                        className={`navbar-li ${
                            bg_hover && "hover:bg-red-900"
                        }`}
                    >
                        <Link href="/">خروج</Link>
                    </li>
                    <li
                        className={`navbar-li ${
                            bg_hover && "hover:bg-red-900"
                        }`}
                    >
                        <Link href="/">جستجو</Link>
                    </li>
                    <li
                        className={`navbar-li whitespace-nowrap ${
                            bg_hover && "hover:bg-red-900"
                        }`}
                    >
                        <Link href="/">علاقه مندی ها</Link>
                    </li>
                </>
            ) : (
                <>
                    <li
                        className={`navbar-li ${
                            bg_hover && "hover:bg-red-900"
                        }`}
                    >
                        <Link href="/">ورود</Link>
                    </li>
                    <li
                        className={`navbar-li whitespace-nowrap ${
                            bg_hover && "hover:bg-red-900"
                        }`}
                    >
                        <Link href="/">جستجو</Link>
                    </li>
                </>
            )}
        </>
    );
}
