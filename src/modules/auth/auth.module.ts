import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../users/users.module';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';

@Module({
	imports:[UsersModule, TokenModule],
	controllers: [AuthController],
	providers: [AuthService, ConfigService , JwtStrategy ]
})
export class AuthModule implements NestModule{
	configure(consumer: MiddlewareConsumer) {
		consumer
		  .apply(LoggerMiddleware)
		  .forRoutes({ path: 'auth', method: RequestMethod.POST });
	  }
}
