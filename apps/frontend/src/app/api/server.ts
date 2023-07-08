import { notFound } from "next/navigation";

export async function getFood(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/foods/${id}`, {
        next: { revalidate: 0 },
    });
    if (!res.ok) {
        if (res.status === 404) notFound();

        throw new Error("خطایی رخ داده است");
    }

    return res.json();
}
