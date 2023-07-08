import Image from "next/image";
import { getFood } from "@/app/api/server";
import { Food } from "backend";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next/types";
import { formatTime } from "../utils";
import LikeButton from "../components/LikeButton";

export async function generateMetadata(
    { params }: { params: { foodSlug: string[] } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = params.foodSlug[0];
    const food = await getFood(id);
    const title = ` ${food.food_name} | ${(await parent).title?.absolute}`;
    return { title };
}

export default async function FoodPage({
    params,
}: {
    params: { foodSlug: string[] };
}) {
    const [id, foodNameSlug] = params.foodSlug;
    const foodData: Food = await getFood(id);
    const imgSrc = `${process.env.NEXT_PUBLIC_BASE_URL}/images${foodData.food_picture}`;

    if (foodData.slug !== decodeURI(foodNameSlug))
        redirect(`/${id}/${foodData.slug}`);

    return (
        <div className="mx-auto mt-4 flex w-[90vw] max-w-7xl flex-col items-center justify-start bg-white p-2">
            <div className="my-2 flex w-full justify-start md:my-0 md:mt-1">
                {<LikeButton foodId={foodData.id} />}
            </div>

            <div className="flex w-full flex-col-reverse justify-center md:flex-row">
                <div className="mt-6 flex flex-1 flex-col items-center justify-center space-y-4 md:mt-0">
                    <h1 className="text-2xl text-red-900">
                        {foodData.food_name}
                    </h1>
                    <h2 className="text-base text-red-950">
                        زمان پخت: {formatTime(foodData.cooking_duration)}
                    </h2>
                    <h2 className="text-base text-red-950">
                        برای {foodData.serves} نفر
                    </h2>
                </div>
                <div className="relative flex aspect-video min-h-[35vh] flex-1">
                    <Image
                        src={imgSrc}
                        alt={foodData.food_name}
                        fill
                        className="w-full rounded object-cover"
                    />
                </div>
            </div>
            <table className="mt-5 w-[90%] table-fixed border-collapse border border-slate-500 xl:w-1/2">
                <thead>
                    <tr>
                        <th className="border border-gray-700 bg-red-100 py-2">
                            ماده اولیه
                        </th>
                        <th className="border border-gray-700 bg-red-100 py-2">
                            مقدار
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {foodData.ingredients
                        .split("\n")
                        .map((ingredient, indx) => {
                            const [val, amount] = ingredient.split(":");
                            return (
                                <tr key={indx}>
                                    <td className="border border-gray-700 bg-red-100 py-1 text-center">
                                        {val}
                                    </td>
                                    <td className="border border-gray-700 bg-red-100 py-1 text-center">
                                        {amount}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <h2 className="mt-3 w-[95%] text-right text-xl">دستور پخت</h2>
            <p className="w-[95%] whitespace-pre-wrap text-justify leading-loose">
                {foodData.food_recipe}
            </p>
        </div>
    );
}
