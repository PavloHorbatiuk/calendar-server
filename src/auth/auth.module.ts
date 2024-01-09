import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

export const jwtSecret = 'zjP9i6ZS5LoSKCRk';

@Module({
	imports: [
		PrismaModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_KEY || 'SECRET',
			signOptions: { expiresIn: '1h' },
		}),
	],
	exports:[AuthService, JwtModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
