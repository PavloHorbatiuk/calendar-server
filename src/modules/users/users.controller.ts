import { Body, Controller, Delete, Patch,  Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@ApiTags('API')
@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) { }

	@ApiResponse({ status: 200, type: UpdateUserDto })
	@UseGuards(JwtAuthGuard)
	@Patch('/update')
	updateUser(@Body() userDto: UpdateUserDto ): Promise<UpdateUserDto> {
		return this.userService.updateUser(userDto)
	}

	@ApiResponse({ status: 200 })
	@Delete('/delete')
	@UseGuards(JwtAuthGuard)
	deleteUser(@Req() request): Promise<boolean> {
		const user = request.user.email

		return this.userService.deleteUser(user)
	}
}