import localFont from "next/font/local";
import Navbar from "./components/navbar/navbar";
import "./globals.css";

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
                <Navbar />
                {children}
            </body>
        </html>
    );
}
