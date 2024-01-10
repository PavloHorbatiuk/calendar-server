import { Post, Body, Patch, Param, Delete, Controller, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CreateEventDto } from './dto/create-event.dto';
import { FindOneEventDto } from './dto/findOne-event.dto'
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from './entities/event.entity';
import { EventService } from './event.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('event')
@ApiTags('Event')
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@Post("/create")
	@ApiCreatedResponse({ type: EventEntity })
	create(@Body() createEventDto: CreateEventDto) {
		return this.eventService.create(createEventDto);
	}

	@Post('/all')
	@UseGuards(JwtAuthGuard)
	findAll() {
		return this.eventService.findAll();
	}

	@Post('/findOne')
	findOne(@Body() findOneEventDto: FindOneEventDto) {
		return this.eventService.findOne(findOneEventDto);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
		return this.eventService.update(+id, updateEventDto);
	}

	@Delete(':id')
	remove(@Body() authorId: number, id: number) {
		return this.eventService.remove(authorId, id);
	}
}
