import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';

import type { EventSchema } from './entities/event.entity';

@ApiTags('API')
@UseInterceptors(CacheInterceptor)
@Controller('events')
export class EventsController {
	constructor(private readonly eventsService: EventsService) { }

	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() createEventDto: CreateEventDto, @Req() request) {
		const user = request.user

		return this.eventsService.create(createEventDto, user);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async findAll(@Req() request): Promise<EventSchema[]> {
		const user = request.user

		return await  this.eventsService.findAll(user);
	}

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.eventsService.findOne(+id);
	// }

	@Patch()
	update( @Body() updateEventDto: UpdateEventDto ) {
		return this.eventsService.update(updateEventDto);
	}

	@Delete('/:id')
	remove(@Param('id') id: string) {
		return this.eventsService.remove(+id);
	}

	@Get('/event-placed')
	place(@Body() createEventDto: CreateEventDto){
		return this.eventsService.placeEvent(createEventDto)
	}
}
