import * as z from "zod";

export const FoodModel = z.object({
    id: z.string(),
    food_name: z.string(),
    food_picture: z.string(),
    cooking_duration: z.coerce.number(),
    serves: z.coerce.number(),
    ingredients: z.string().min(1, "مواد اولیه یافت نشد"),
    isReviewed: z.boolean(),
    food_recipe: z.string(),
});
