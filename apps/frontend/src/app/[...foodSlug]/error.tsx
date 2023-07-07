"use client";

import AlertBox from "@/app/components/AlertBox";

export default function Error({ error }: { error: Error }) {
    return (
        <div className="mt-4 flex w-full justify-center">
            <AlertBox messageType="error" message={error.message} />
        </div>
    );
}
