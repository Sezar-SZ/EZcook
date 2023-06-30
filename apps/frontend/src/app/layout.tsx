import localFont from "next/font/local";
import Providers from "./providers";
import Navbar from "@/app/components/navbar/navbar";
import "./globals.css";
import AuthInit from "@/app/components/AuthInit";

export const metadata = {
    title: "ایزی کوک",
};

const iranSans = localFont({
    src: "./asset/iransansweb.woff",
    display: "swap",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fa" dir="rtl" className={iranSans.className}>
            <body className="overflow-x-hidden bg-secondary">
                <Providers>
                    <AuthInit>
                        <Navbar />
                        {children}
                    </AuthInit>
                </Providers>
            </body>
        </html>
    );
}

// https://tanstack.com/query/v4/docs/react/guides/ssr
