import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entity/auth.entity';
import { JwtAuthGuard } from 'src/guards/jwt-quards';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@ApiOkResponse({ type: AuthEntity })
	login(@Body() { email, password }: LoginDto) {
		return this.authService.login(email, password);
	}

	@Post('signup')
	@HttpCode(201)
	@ApiResponse({status:201}) // Add createUserDto
	@ApiOkResponse({ type: AuthEntity })
	Signup(@Body() { email, password }: LoginDto) {
		return this.authService.addUser(email, password);
	}


	@UseGuards(JwtAuthGuard)
	@Post('test')
	test(){
		return true
	}
}