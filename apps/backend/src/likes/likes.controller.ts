import {
    Controller,
    Get,
    Post,
    Param,
    HttpCode,
    HttpStatus,
    UseGuards,
    Req,
} from "@nestjs/common";
import { LikesService } from "./likes.service";
import { AccessTokenGuard } from "src/auth/guards/accessToken.guard";

@Controller("likes")
@UseGuards(AccessTokenGuard)
export class LikesController {
    constructor(private readonly likesService: LikesService) {}

    @Get()
    findAll(@Req() req) {
        return this.likesService.findAll(req.user.id);
    }

    @Get(":foodId")
    findOne(@Req() req, @Param("foodId") foodId: string) {
        return this.likesService.findOne(req.user.id, foodId);
    }

    @Post(":foodId")
    @HttpCode(HttpStatus.OK)
    update(@Req() req, @Param("foodId") foodId: string) {
        return this.likesService.update(req.user, foodId);
    }
}
