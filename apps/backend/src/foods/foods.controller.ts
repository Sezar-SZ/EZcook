import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    HttpCode,
    HttpStatus,
    UsePipes,
    UseInterceptors,
    ParseFilePipe,
    UploadedFile,
    FileTypeValidator,
    MaxFileSizeValidator,
} from "@nestjs/common";
import { FoodsService } from "./foods.service";
import { CreateFoodDto, createFoodSchema } from "./dto";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "@prisma/client";
import { AccessTokenGuard } from "src/auth/guards/accessToken.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { ZodValidationPipe } from "src/validators/zod.validator";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("foods")
export class FoodsController {
    constructor(private readonly foodsService: FoodsService) {}

    @Post()
    // @UseGuards(AccessTokenGuard)
    @UseInterceptors(FileInterceptor("food_picture"))
    @UsePipes(
        // new ParseFormDataJsonPipe({ except: ["food_picture"] }),
        new ZodValidationPipe(createFoodSchema, { ignore: "buffer" }),
        FileInterceptor("food_picture")
    )
    create(
        @Body() createFoodDto: CreateFoodDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 1024 * 1024 * 10,
                        message: "حجم عکس تا 10 مگابایت",
                    }),
                    new FileTypeValidator({
                        fileType: ".(png|jpg|jpeg)",
                    }),
                ],
            })
        )
        food_picture: Express.Multer.File
    ) {
        return this.foodsService.create(createFoodDto, food_picture);
    }

    @Get("/search/:q")
    search(@Param("q") q: string) {
        return this.foodsService.search(q);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.foodsService.findOne(id);
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
