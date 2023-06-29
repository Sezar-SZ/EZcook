"use client";

import Image from "next/image";
import Logo from "@/app/asset/logo.png";
export default function Login() {
    return (
        <div className="mx-auto mt-[10vh] flex w-[90vw] flex-col items-center justify-center sm:w-[40vmin]">
            <Image src={Logo} alt="easy cook logo" className="w-[20vmin]" />
            <form
                className="mt-4 flex w-full flex-col space-y-6"
                dir="ltr"
                onSubmit={(event) => {
                    event.preventDefault();
                    console.log("sign in");
                }}
            >
                <input
                    className="rounded-sm px-2 py-1"
                    type="text"
                    placeholder="email"
                />
                <input
                    className="rounded-sm px-2 py-1"
                    type="password"
                    placeholder="password"
                />
                <div className="mx-auto flex w-1/4 flex-col justify-center space-y-4">
                    <button
                        type="submit"
                        className="w-full rounded-md bg-primary px-1 py-2 text-white"
                    >
                        ورود
                    </button>
                    <button
                        type="button"
                        className="w-full rounded-md bg-primary px-1 py-2 text-white"
                        onClick={() => {
                            console.log("sign up");
                        }}
                    >
                        عضویت
                    </button>
                </div>
            </form>
        </div>
    );
}
