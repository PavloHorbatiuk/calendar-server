import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service';

import type { CreateUserDTO } from './dto';


@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) { }

	async findUserByEmail(email:string){
		return this.prisma.user.findFirst({ where:{ email } })
	}

	async hashPassword(password: string) {
		return bcrypt.hash(password, 10)
	}

	async createUser(dto: CreateUserDTO):Promise<CreateUserDTO> {
		dto.password = await this.hashPassword(dto.password)
		await this.prisma.user.create({ data: dto })

		return dto
	}
}