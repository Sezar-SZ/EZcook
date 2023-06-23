import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async login(loginDto: LoginDto): Promise<any> {
        const user = await this.usersService.findOne(loginDto.email);
        if (!user) throw new UnauthorizedException();
        const match = await bcrypt.compare(loginDto.password, user.password);
        if (match) {
            const { password, ...userData } = user;
            // Todo: Issue jwt...
            return userData;
        }
        throw new UnauthorizedException();
    }
}
