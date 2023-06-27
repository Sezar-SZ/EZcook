import { BadRequestException, Injectable } from "@nestjs/common";

import * as bcrypt from "bcrypt";

import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto";
import { refreshExpireDate } from "src/utils";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
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
