import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from 'src/prisma/prisma.module';


import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
	imports:[
		ClientsModule.register([
			{
		      name: 'EVENTS_SERVICE',
			  transport: Transport.RMQ,
			  options:{
					urls:['amqp://localhost:5672'],
					queue:'events-queue'
				} }
		]),
		PrismaModule],
	controllers: [EventsController],
	providers: [EventsService],
})
export class EventsModule {}
