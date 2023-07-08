import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { createWriteStream } from "fs";
import { CreateFoodDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { extname } from "path";
import slugify from "slugify";
import { alphabet } from "src/utils";

@Injectable()
export class FoodsService {
    constructor(private prisma: PrismaService) {}
    async create(
        createFoodDto: CreateFoodDto,
        food_picture: Express.Multer.File
    ) {
        try {
            const randomName = Array(11)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join("");
            const fileName = `${Date.now()}${randomName}${extname(
                food_picture.originalname
            )}`;
            const ws = createWriteStream(`images/${fileName}`);
            ws.write(food_picture.buffer);

            slugify.extend(alphabet);
            const slug = slugify(createFoodDto.food_name, {
                remove: /[$*_+~.()'"!\-:@]+/g,
            });

            const food = await this.prisma.food.create({
                data: {
                    food_name: createFoodDto.food_name,
                    food_picture: `/${fileName}`,
                    serves: +createFoodDto.serves,
                    ingredients: createFoodDto.ingredients,
                    cooking_duration: +createFoodDto.cooking_duration,
                    food_recipe: createFoodDto.food_recipe,
                    slug,
                },
            });

            return food;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error);
        }
    }

    async search(q: string) {
        const result = await this.prisma.food.findMany({
            where: {
                food_name: {
                    search: q.split(" ").join(" & "),
                },
                isReviewed: true,
            },
        });
        return result;
    }

    async findOne(id: string) {
        const result = await this.prisma.food.findFirst({
            where: { id, isReviewed: true },
        });
        if (result) return { ...result };
        throw new NotFoundException();
    }

    async approve(id: string) {
        try {
            await this.prisma.food.update({
                where: { id },
                data: { isReviewed: true },
            });
            return { message: "food approved successfully" };
        } catch (error) {
            if (error["code"] && error["code"] === "P2025")
                return new NotFoundException();
            return new InternalServerErrorException();
        }
    }
    async remove(id: string) {
        try {
            await this.prisma.food.delete({
                where: { id },
            });
            return { message: "food deleted successfully" };
        } catch (error) {
            if (error["code"] && error["code"] === "P2025")
                return new NotFoundException();
            return new InternalServerErrorException();
        }
    }

    async findAll() {
        return await this.prisma.food.findMany();
    }
}
