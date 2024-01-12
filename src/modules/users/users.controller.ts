import { Body, Controller, Delete, Patch,  Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import {  UpdateUserDTO } from './dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) { }


	@ApiTags('API')
	@ApiResponse({ status: 200, type: UpdateUserDTO })
	@UseGuards(JwtAuthGuard)
	@Patch()
	updateUser(@Body() updateUserDTO: UpdateUserDTO, @Req() request):Promise<UpdateUserDTO> {
		const user = request.user

		return this.userService.updateUser(user.email, updateUserDTO)
	}

	@ApiTags('API')
	@ApiResponse({ status: 200 })
	@Delete('/delete')
	@UseGuards(JwtAuthGuard)
	deleteUser(@Req() request): Promise<boolean> {
		const user = request.user.email

		return this.userService.deleteUser(user)
	}
}