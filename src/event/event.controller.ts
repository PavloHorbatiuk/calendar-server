import { Controller, Get, Post, Body, Patch, Param, Delete, Logger} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { findOneEventDto } from './dto/findOne-event.dto'
import { ApiCreatedResponse } from '@nestjs/swagger';
import { EventEntity } from './entities/event.entity';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post("/create")
  @ApiCreatedResponse({ type: EventEntity })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get('/getall')
  findAll(@Param('id') id: number) {
    return this.eventService.findAll(id);
  }

  @Post('/findOne')
  findOne(@Body() findOneEventDto: findOneEventDto) {
    return this.eventService.findOne(findOneEventDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
