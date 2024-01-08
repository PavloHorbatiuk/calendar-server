import {
	Body,
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

import type { AuthEntity } from './entity/auth.entity';
import type { UserCreateInputWithHashedPassword } from './types/types';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async login(email: string, password: string): Promise<AuthEntity> {
		const user = await this.prisma.user.findUnique({ where: { email: email } });

		if (!user) {
			throw new NotFoundException(`No user found for email: ${email}`);
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid password');
		}

		return {
			accessToken: this.jwtService.sign({ userId: user.id }),
			id: user.id,
			email: user.email
		};
	}

	async addUser(@Body('email') email:string, @Body("password") password:string):Promise<AuthEntity>{
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		const userData: UserCreateInputWithHashedPassword = {
			email,
			password :  hashedPassword,
		};

		const userExists = await this.prisma.user.findFirst({ where:{ email } })


		if (!userExists){
			const user = await this.prisma.user.create({ data:userData })

			return {
				accessToken: this.jwtService.sign({ userId: user.id }),
				id: user.id,
				email: user.email
			}
		} else {
			throw new ConflictException('User already exist');
		}
	}
}