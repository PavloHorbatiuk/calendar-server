import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
// import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { CreateUserDto } from '../users/dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@ApiTags('API')
	@ApiResponse({ status: 201, type: CreateUserDto })
	@Post('register')
	register(@Body() dto: CreateUserDto) {
		return this.authService.registerUsers(dto)
	}

	@ApiTags('API')
	@ApiResponse({ status: 200, type:AuthUserResponse })
	@Post('login')
	login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
		return this.authService.loginUser(dto)
	}
}