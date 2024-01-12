import { Body, Controller, Patch,  Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import {  UpdateUserDTO } from './dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';


@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) { }


	@ApiTags('API')
	@ApiResponse({ status: 200, type: UpdateUserDTO })
	@UseGuards(JwtAuthGuard)
	@Patch()
	updateUser(@Body() updateUserDTO: UpdateUserDTO, @Req() request) {
		const user = request.user
		return this.userService.updateUser(user.email, updateUserDTO)
	}
}