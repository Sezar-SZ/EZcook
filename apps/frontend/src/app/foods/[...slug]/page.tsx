import { getFood } from "@/app/api/server";
import { Food } from "backend";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next/types";

export async function generateMetadata(
    { params }: { params: { slug: string[] } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = params.slug[0];
    const food = await getFood(id);
    const title = ` ${food.food_name} | ${(await parent).title?.absolute}`;
    return { title };
}

export default async function FoodPage({
    params,
}: {
    params: { slug: string[] };
}) {
    const [id, foodNameSlug] = params.slug;
    const foodData: Food = await getFood(id);
    console.log(foodData.slug, foodNameSlug);

    if (foodData.slug !== decodeURI(foodNameSlug))
        redirect(`/foods/${id}/${foodData.slug}`);

    return <div></div>;
}
