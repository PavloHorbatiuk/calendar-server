import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entity/auth.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@ApiOkResponse({ type: AuthEntity })
	login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}

	@Post('signup')
	@HttpCode(201)
	@ApiResponse({status:201}) // Add createUserDto
	@ApiOkResponse({ type: AuthEntity })
	Signup(@Body() CreateUserDto: CreateUserDto) {
		return this.authService.addUser(CreateUserDto);
	}
}