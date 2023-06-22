import * as z from "zod";

export const LikesModel = z.object({
    id: z.number().int(),
    userId: z.number().int(),
    foodId: z.string(),
});
