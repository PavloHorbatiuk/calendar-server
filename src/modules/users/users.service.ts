import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { APP_ERROR } from 'src/common/errors';
import { PrismaService } from 'src/prisma/prisma.service';

import type { CreateUserDTO, UpdateUserDTO } from './dto';


@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) { }

	async findUserByEmail(email: string) {
		return this.prisma.user.findFirst({ where: { email } })
	}

	async hashPassword(password: string) {
		return bcrypt.hash(password, 10)
	}

	async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
		dto.password = await this.hashPassword(dto.password)
		await this.prisma.user.create({ data: dto })

		return dto
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

	async updateUser(email: string, dto: UpdateUserDTO) {
		if (Object.keys(dto).length > 2) {
			throw new BadRequestException(APP_ERROR.TO_MANY_FIELDS)
		} else {
			 await this.prisma.user.update({ where: { email: email }, data: { name: dto.name } })

			 return dto
		}
	}

	async deleteUser(email: string) {
		await this.prisma.user.delete({ where: { email } })

		return true
	}
}