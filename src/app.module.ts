import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [AuthModule, PrismaModule, EventModule, ConfigModule.forRoot({envFilePath:'.env'})],
	controllers: [],
	providers: [],
})
export class AppModule {}
