import * as z from "zod";

export const FoodModel = z.object({
    id: z.string(),
    food_name: z.string(),
    food_picture: z.string(),
    cooking_duration: z.number().int(),
    serves: z.number().int(),
    ingredients: z.string().array(),
    food_recipe: z.string(),
});
