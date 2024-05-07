import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { EventsModule } from './modules/events/events.module';
import { TokenModule } from './modules/token/token.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
	imports: [
		UsersModule,
		AuthModule,
		PrismaModule,
		EventsModule,
		ConfigModule.forRoot({ envFilePath: '.env' }),
		TokenModule,
		CacheModule.register({isGlobal:true, ttl: 30 * 10000, 
			store: redisStore
			})
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
