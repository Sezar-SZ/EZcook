import { BadRequestException, Injectable } from "@nestjs/common";

import * as bcrypt from "bcrypt";

import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto";

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
                role: createUserDto.role,
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
}
