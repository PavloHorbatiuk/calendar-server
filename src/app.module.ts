import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { EventsModule } from './modules/events/events.module';
import { TokenModule } from './modules/token/token.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
	imports: [
		UsersModule,
		AuthModule,
		PrismaModule,
		EventsModule,
		ConfigModule.forRoot({ envFilePath: '.env' }),
		TokenModule
	],
	controllers: [],
	providers: [],
})
export class AppModule implements NestModule {	
	configure(consumer: MiddlewareConsumer) {
	consumer
	  .apply(LoggerMiddleware)
	  .forRoutes({ path:'*', method: RequestMethod.ALL });
  } }
