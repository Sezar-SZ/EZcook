import Link from "next/link";
import NavButtons from "./navbar-buttons";

export default function Navbar() {
    return (
        <nav className="sticky flex w-screen items-center justify-between bg-primary text-white">
            <NavButtons />
            <Link
                className="flex max-w-xs items-center p-3"
                passHref
                href={"/"}
            >
                <span className="ml-3 text-2xl">ایزی کوک</span>
                <img
                    src="/cookingHat.png"
                    alt="easy cook logo"
                    className=" w-[5vmax]  min-w-[4rem] max-w-[7rem] object-contain"
                />
            </Link>
        </nav>
    );
}
