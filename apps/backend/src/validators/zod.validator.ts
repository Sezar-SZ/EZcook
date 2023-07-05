import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { Schema } from "zod";
import { fromZodError } from "zod-validation-error";

interface Options {
    ignore?: string;
}
@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: Schema, private options?: Options) {}

    async transform(value: any) {
        if (this.options) {
            const { ignore } = this.options;
            if (typeof value === "object" && Object.hasOwn(value, ignore))
                return value;
        }

        const res = await this.schema.safeParseAsync(value);

        if ("error" in res) {
            throw new BadRequestException("Validation failed", {
                description: `${fromZodError(res.error)}`,
            });
        }
        return value;
    }
}
