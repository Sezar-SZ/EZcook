import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { RedisModule } from "./redis/redis.module";
import { FoodsModule } from "./foods/foods.module";
import Config from "./config/ConfigSchema";

import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { LikesModule } from './likes/likes.module';

@Module({
    imports: [
        UsersModule,
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [Config],
        }),
        AuthModule,
        RedisModule,
        FoodsModule,
        process.env.NODE_ENV === "development" &&
            ServeStaticModule.forRoot({
                rootPath: join(__dirname, "..", "../images"),
                serveRoot: "/images/",
            }),
        LikesModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
