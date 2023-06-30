import { z } from "zod";

enum NodeEnv {
    production = "production",
    development = "development",
}

export const ConfigSchema = z.object({
    NEXT_PUBLIC_BASE_URL: z.string().url(),
});

export const config = ConfigSchema.parse(process.env);
