import { Metadata } from "next/types";
import AlertBox from "./components/AlertBox";

export const metadata: Metadata = {
    title: "404 Not Found",
};

export default function NotFound() {
    return (
        <div className="mt-4 flex w-full justify-center">
            <AlertBox
                messageType="error"
                message={"صفحه ی مورد نظر پیدا نشد"}
            />
        </div>
    );
}
