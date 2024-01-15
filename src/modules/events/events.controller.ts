import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';

import type { EventSchema } from './entities/event.entity';

@Controller('events')
export class EventsController {
	constructor(private readonly eventsService: EventsService) {}

	@ApiTags('API')
	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() createEventDto: CreateEventDto, @Req() request) {
		const user = request.user
		return this.eventsService.create(createEventDto, user);
	}


	@ApiTags('API')
	@UseGuards(JwtAuthGuard)
	@Get()
	findAll(@Req() request):Promise<EventSchema[]> {
		const user = request.user

		return this.eventsService.findAll(user);
	}

  @ApiTags('API')
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.eventsService.findOne(+id);
	}

  @ApiTags('API')
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
		return this.eventsService.update(+id, updateEventDto);
	}

  @ApiTags('API')
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.eventsService.remove(+id);
	}
}
