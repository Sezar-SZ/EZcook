import { FoodModel } from "../../../prisma/zod";
import { z } from "zod";

export const createFoodSchema = FoodModel.omit({
    id: true,
    isReviewed: true,
    food_picture: true,
});
export type CreateFoodDto = z.infer<typeof createFoodSchema>;
