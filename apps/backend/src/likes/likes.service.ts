import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LikesService {
    constructor(private prisma: PrismaService) {}
    async findAll(userId: number) {
        const favorites = await this.prisma.user
            .findFirst({
                where: { id: userId },
            })
            .Likes({ include: { food: true } });
        return favorites;
    }

    async findOne(userId: number, foodId: string) {
        const result = await this.prisma.user
            .findFirst({
                where: {
                    id: userId,
                },
            })
            .Likes({ where: { foodId: foodId }, include: { food: true } });
        return result.length > 0 ? result[0] : {};
    }

    async update(user: User, foodId: string) {
        try {
            const liked = await this.findOne(user.id, foodId);
            if (liked["id"]) {
                await this.prisma.likes.deleteMany({
                    where: { id: user.id, foodId },
                });
                return { message: "food removed from the favorites list" };
            }
            await this.prisma.likes.create({
                data: {
                    user: { connect: { id: user.id, email: user.email } },
                    food: {
                        connect: { id: foodId },
                    },
                },
            });
            return { message: "food added to the favorites list" };
        } catch (error) {
            if (error.code === "P2025")
                return new BadRequestException(
                    "Food with provided ID not found"
                );
            return new InternalServerErrorException();
        }
    }
}
