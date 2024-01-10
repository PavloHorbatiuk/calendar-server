import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { EventModule, EventModule } from './modules/event/event.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [AuthModule,UsersModule, PrismaModule, EventModule, ConfigModule.forRoot({envFilePath:'.env'})],
	controllers: [],
	providers: [],
})
export class AppModule {}
