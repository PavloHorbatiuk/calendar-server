import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';

// import type { EventSchema } from './entities/event.entity';
import type { UserResponse } from './response';


@ApiTags('API')
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
	findAll(@Req() request): Promise<UserResponse[]> {
		const user = request.user

		return this.eventsService.findAll(user);
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<UserResponse> {
		return this.eventsService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<UserResponse> {
		return this.eventsService.update(+id, updateEventDto);
	}

	@Delete('/:id')
	remove(@Param('id') id: string): Promise<UserResponse> {
		return this.eventsService.remove(+id);
	}
}
