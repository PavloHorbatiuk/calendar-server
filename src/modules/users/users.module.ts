import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TokenModule } from '../token/token.module';


@Module({
	imports:[PrismaModule, TokenModule],
	controllers:[UsersController],
	providers:[UsersService, JwtService],
	exports:[UsersService],
})

export class UsersModule{}