import { z } from "zod";

const ConfigSchema = z.object({
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    DB_PORT: z.coerce.number(),
    DATABASE_URL: z.string().url(),
});

export default () => ConfigSchema.parse(process.env);
