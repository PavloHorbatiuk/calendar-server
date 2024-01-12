import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { EventsModule } from './modules/events/events.module';

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
export class AppModule { }
