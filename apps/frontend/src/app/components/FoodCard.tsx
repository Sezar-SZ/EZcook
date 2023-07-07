import Image from "next/image";
import { type Food } from "backend";
import Link from "next/link";

export default function FoodCard({ food }: { food: Food }) {
    const src = `${process.env.NEXT_PUBLIC_BASE_URL}/images${food.food_picture}`;

    return (
        <Link
            passHref
            href={`/${food.id}/${food.slug}`}
            className="group relative aspect-video w-full rounded bg-red-800"
        >
            <Image
                loader={() => src}
                src={src}
                fill={true}
                alt={food.food_name}
                className="rounded object-cover"
            />
            <div className="t-0 l-0 invisible absolute flex h-full w-full items-center justify-center bg-gray-900 opacity-75 group-hover:visible">
                <span className="text-md font-bold text-white">
                    {food.food_name}
                </span>
            </div>
        </Link>
    );
}
