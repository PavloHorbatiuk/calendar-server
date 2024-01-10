import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDTO } from './dto';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';


@Controller('users')
export class UsersController{
	constructor (private readonly userService: UsersService){}

	@ApiTags('API')
	@Post('create-user')
	createUsers(@Body()dto:CreateUserDTO){
		return this. userService.createUser(dto)
	}
}