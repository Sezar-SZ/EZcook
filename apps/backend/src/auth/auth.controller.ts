import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    UsePipes,
    UseGuards,
    Request,
    Get,
    Delete,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ZodValidationPipe } from "src/validators/zod.validator";
import { LoginDto, loginSchema } from "./dto";
import { AuthGuard } from "./guards/auth.guard";
import { Role } from "@prisma/client";
import { Roles } from "./decorators/roles.decorator";
import { RolesGuard } from "./guards/roles.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    @UsePipes(new ZodValidationPipe(loginSchema))
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @UseGuards(AuthGuard)
    @Get()
    async getProfile(@Request() req) {
        return await this.authService.getCurrentUser(req.body.email);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @Delete()
    delete() {
        return { message: "secret only for admin!" };
    }
}
