import { 
    Injectable, 
    UnauthorizedException, 
    BadRequestException
} from '@nestjs/common';

import {JwtService} from "@nestjs/jwt";
import {PrismaService} from "../prisma/prisma.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "./dto/login.dto";


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
    ) {}


    async login(loginDto: LoginDto)
    {
        const user = await this.prisma.users.findUnique({
            where: { 
                email: loginDto.email,
             },
        });


        if (!user) {
            throw new UnauthorizedException(
                'Invalid Credentials'
            );
        }

        const passWordmatch = await bcrypt.compare(
            loginDto.password,
            user.password,
        );

        if (!passWordmatch) {
            throw new UnauthorizedException(
                'Invalid Credentials'
            );
        }

        const payload = {
            sub: user.id,
            email: user.email,
            username: user.username,
        };

        return {
            access_token: await this.jwtService.signAsync(
                payload
            ),
        };
    }

}
