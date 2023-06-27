import { BadRequestException, Injectable } from "@nestjs/common";

import * as bcrypt from "bcrypt";

import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto";
import { Role } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { refreshExpireDate } from "src/utils";

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService
    ) {}

    async onModuleInit() {
        const adminEmail = this.configService.get("ADMIN_EMAIL");
        const adminPassword = this.configService.get("ADMIN_PASSWORD");
        try {
            await this.create(
                {
                    email: adminEmail,
                    password: adminPassword,
                },
                "ADMIN"
            );
        } catch (error) {}
    }

    async create(createUserDto: CreateUserDto, role?: Role) {
        const user = await this.prisma.user.findFirst({
            where: { email: createUserDto.email },
        });
        if (user)
            throw new BadRequestException("Bad Request", {
                description: "Account with this Email already exists",
            });
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                password: hashedPassword,
                role: role || "USER",
            },
        });
    }

    async findOne(email: string) {
        return await this.prisma.user.findFirst({
            where: {
                email,
            },
        });
    }
    async findById(id: number) {
        return await this.prisma.user.findFirst({
            where: {
                id,
            },
        });
    }

    async addRefreshToken(userId: number, refreshToken: string) {
        // await this.prisma.user.update({
        //     where: { id: userId },
        //     data: {
        //         Token: {
        //             create: [
        //                 {
        //                     refreshToken,
        //                 },
        //             ],
        //         },
        //     },
        // });
        await this.prisma.token.create({
            data: {
                userId,
                refreshToken,
                expiresAt: refreshExpireDate(),
            },
        });
    }

    async removeRefreshToken(userId: number, refreshToken: string) {
        await this.prisma.token.deleteMany({
            where: { refreshToken, userId },
        });
    }
}
