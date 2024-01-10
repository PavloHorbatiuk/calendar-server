import {
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
import { CreateUserDto } from './dto/createUser.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) { }

	async login(loginDto: LoginDto): Promise<AuthEntity> {
		const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });

		if (!user) {
			throw new NotFoundException(`No user found for email: ${loginDto.email}`);
		}

		const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid password');
		}

		return {
			accessToken: this.jwtService.sign({ userId: user.id }),
			id: user.id,
			email: user.email
		};
	}

	async addUser(userDto: CreateUserDto): Promise<AuthEntity> {
		const userExists = await this.prisma.user.findFirst({ where: { email: userDto.email } })

		if (!userExists) {
			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(userDto.password, salt);
			const userData: UserCreateInputWithHashedPassword = {
				email: userDto.email,
				password: hashedPassword,
			};
			const user = await this.prisma.user.create({ data: userData })
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