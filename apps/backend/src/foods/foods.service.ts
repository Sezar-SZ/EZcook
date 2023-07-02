import { Injectable } from "@nestjs/common";
import { CreateFoodDto } from "./dto";

@Injectable()
export class FoodsService {
    create(createFoodDto: CreateFoodDto) {
        return "This action adds a new food";
    }

    search() {
        return `This action search through all foods`;
    }

    findOne(id: number) {
        return `This action returns a #${id} food`;
    }

    remove(id: number) {
        return `This action removes a #${id} food`;
    }
}
