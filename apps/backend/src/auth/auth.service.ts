import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto): Promise<any> {
        const user = await this.usersService.findOne(loginDto.email);
        if (!user) throw new UnauthorizedException();
        const match = await bcrypt.compare(loginDto.password, user.password);
        if (match) {
            const payload = {
                sub: user.id,
                email: user.email,
                role: user.role,
            };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }
        throw new UnauthorizedException();
    }

    async getCurrentUser(email: string) {
        const user = await this.usersService.findOne(email);
        const { password, ...result } = user;
        return result;
    }
}
