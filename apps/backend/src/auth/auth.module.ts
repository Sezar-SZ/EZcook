import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { ConfigModule } from "@nestjs/config";
@Module({
    imports: [
        UsersModule,
        ConfigModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "60s" },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
