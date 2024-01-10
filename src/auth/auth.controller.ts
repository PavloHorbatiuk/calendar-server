import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';


import { CreateUserDto } from './dto/createUser.dto';
import { AuthEntity } from 'src/modules/auth/entity/auth.entity';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { AuthService } from 'src/modules/auth/auth.service';

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
	@ApiOkResponse({ type: AuthEntity })
	Signup(@Body() CreateUserDto: CreateUserDto) {
		return this.authService.addUser(CreateUserDto);
	}
}
