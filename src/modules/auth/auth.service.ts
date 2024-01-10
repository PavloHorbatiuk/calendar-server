import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { APP_ERROR } from 'src/common/errors';

import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';

import type { UserLoginDTO } from './dto';
import type { AuthUserResponse } from './response';
import type { CreateUserDTO } from '../users/dto';


@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly tokenService:TokenService
	) { }

	async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
		const existUser = await this.userService.findUserByEmail(dto.email)
		if (existUser) throw new BadRequestException(APP_ERROR.USER_EXIST)

		return this.userService.createUser(dto)
	}

	async loginUser(dto: UserLoginDTO):Promise<AuthUserResponse> {
		const existUser = await this.userService.findUserByEmail(dto.email)
		if (!existUser) throw new BadRequestException(APP_ERROR.USER_NOT_EXIST)
		const validatePassword = await bcrypt.compare(dto.password, existUser.password)
		if (!validatePassword) throw new BadRequestException(APP_ERROR.WRONG_DATA)
		const token = await this.tokenService.generateJwtToken(dto)

		return { ...existUser, token }
	}
}
