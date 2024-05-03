import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { APP_ERROR } from 'src/common/errors';
import { PrismaService } from 'src/prisma/prisma.service';

import { TokenService } from '../token/token.service';

import type { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService, private token: TokenService, private jwtService: JwtService) { }

	async findUserByEmail(email: string) {
		return this.prisma.user.findFirst({ where: { email } })
	}

	async hashPassword(password: string) {
		return bcrypt.hash(password, 10)
	}

	async createUser(dto: CreateUserDto) {
		dto.password = await this.hashPassword(dto.password)

		return await this.prisma.user.create({ data: dto })
	}

	exclude<User, Key extends keyof User>(
		user: User,
		keys: Key[]
	): Omit<User, Key> {
		return Object.fromEntries(
			Object.entries(user).filter(([key]) => !keys.includes(key as Key))
		) as Omit<User, Key>;
	}

	async publicUser(email: string) {
		const user = await this.prisma.user.findFirst({ where: { email } });
		if (user) {
			const userWithoutPassword = this.exclude(user, ['password', 'id']);

			return userWithoutPassword;
		}

		return null;
	}

	async updateUser(dto: UpdateUserDto ) {
		const payload = await this.jwtService.decode(dto.token)
		const existedEmail = this.prisma.user.findFirst({ where: { email: payload.user.email } })

		if (existedEmail) throw new HttpException(APP_ERROR.USER_EXIST, HttpStatus.BAD_REQUEST);

		const { email, name, id } = await this.prisma.user.update({ where: { id: payload.user.id }, data: { email: dto.email, name: dto.name } })
		const token = await this.token.generateJwtToken({ email, name, id })

		 return { token, email, name }
	}

	async deleteUser(email: string) {
		await this.prisma.user.delete({ where: { email } })

		return true
	}
}