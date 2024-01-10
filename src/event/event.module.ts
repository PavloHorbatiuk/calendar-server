import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

import { EventController } from './event.controller';
import { EventService } from './event.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports:[PrismaModule, AuthModule],
	controllers: [EventController],
	providers: [EventService],
})
export class EventModule {}
