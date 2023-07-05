"use client";

export type MessageType = "error" | "success";

export default function AlertBox({
    message,
    messageType,
}: {
    message: string;
    messageType: MessageType;
}) {
    return (
        <div
            className={`flex min-h-[70px] w-full  justify-center p-2 sm:w-[60wv] sm:max-w-[700px] ${
                messageType === "error" ? "bg-red-400" : "bg-green-500"
            }`}
        >
            <div
                className={`flex w-full items-center justify-center whitespace-pre-wrap border-2 border-dotted text-center ${
                    messageType === "error"
                        ? "border-red-800"
                        : "border-green-800"
                }`}
            >
                <span>{message}</span>
            </div>
        </div>
    );
}
