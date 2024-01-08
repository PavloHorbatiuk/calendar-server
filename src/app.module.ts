import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
	imports: [AuthModule, PrismaModule, EventModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
