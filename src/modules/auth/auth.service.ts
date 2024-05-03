import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { APP_ERROR } from 'src/common/errors';

import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';

import type { UserLoginDTO } from './dto';
import type { AuthUserResponse } from './response';
import type { CreateUserDto } from '../users/dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly tokenService: TokenService
	) { }

	async registerUsers(dto: CreateUserDto) {
		const existUser = await this.userService.findUserByEmail(dto.email)

		if (existUser) throw new HttpException(APP_ERROR.USER_EXIST, HttpStatus.BAD_REQUEST);

		const { id, email, name } = await this.userService.createUser(dto)
		const token = await this.tokenService.generateJwtToken({ id, email, name });

		return { email, name,  token };
	}

	async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
		const existUser = await this.userService.findUserByEmail(dto.email)
		if (!existUser) throw new HttpException(APP_ERROR.USER_NOT_EXIST, HttpStatus.BAD_REQUEST);

		const validatePassword = await bcrypt.compare(dto.password, existUser.password)
		if (!validatePassword) throw new HttpException(APP_ERROR.WRONG_DATA, HttpStatus.BAD_REQUEST);

		const userDate = {
	        id:existUser.id,
			name: existUser.name,
			email: existUser.email
		}

		const token = await this.tokenService.generateJwtToken(userDate)
		const user = await this.userService.publicUser(dto.email)

		return { ...user, token }
	}
}
