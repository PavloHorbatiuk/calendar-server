import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../users/users.module';

@Module({
	imports:[UsersModule, TokenModule],
	controllers: [AuthController],
	providers: [AuthService, ConfigService , JwtStrategy ]
})
export class AuthModule {}
