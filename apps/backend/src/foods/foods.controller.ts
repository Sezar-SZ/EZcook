import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    HttpCode,
    HttpStatus,
} from "@nestjs/common";
import { FoodsService } from "./foods.service";
import { CreateFoodDto } from "./dto";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "@prisma/client";
import { AccessTokenGuard } from "src/auth/guards/accessToken.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";

@Controller("foods")
export class FoodsController {
    constructor(private readonly foodsService: FoodsService) {}

    @Post()
    @UseGuards(AccessTokenGuard)
    create(@Body() createFoodDto: CreateFoodDto) {
        return this.foodsService.create(createFoodDto);
    }

    @Get("/search/:q")
    search() {
        return this.foodsService.search();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.foodsService.findOne(+id);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Post("/review/:id")
    @HttpCode(HttpStatus.OK)
    review(@Param("id") id: string) {
        return this.foodsService.remove(+id);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.foodsService.remove(+id);
    }
}
