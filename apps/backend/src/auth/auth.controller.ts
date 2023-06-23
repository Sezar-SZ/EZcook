import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    UsePipes,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ZodValidationPipe } from "src/validators/zod.validator";
import { LoginDto, loginSchema } from "./dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    @UsePipes(new ZodValidationPipe(loginSchema))
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
