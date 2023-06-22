import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        return await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                role: createUserDto.role,
                password: createUserDto.password,
            },
        });
    }

    findOne(id: number) {
        return { message: id };
    }
}
