import { Controller, Get, Post, Body, Param, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import { createUserSchema, CreateUserDto } from "./dto";
import { ZodValidationPipe } from "src/validators/zod.validator";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @UsePipes(new ZodValidationPipe(createUserSchema))
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.usersService.findOne(+id);
    }
}
