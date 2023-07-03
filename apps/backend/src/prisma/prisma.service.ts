import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import slugify from "slugify";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        // this.$extends({
        //     result: {
        //         food: {
        //             slug: {
        //                 needs: { food_name: true },
        //                 compute(food) {
        //                     return `${slugify(food.food_name)}`;
        //                 },
        //             },
        //         },
        //     },
        // });
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on("beforeExit", async () => {
            await app.close();
        });
    }
}
