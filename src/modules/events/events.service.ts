import {  HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { APP_ERROR } from 'src/common/errors';
import { PrismaService } from 'src/prisma/prisma.service';

import type { CreateEventDto } from './dto/create-event.dto';
import type { UpdateEventDto } from './dto/update-event.dto';
import type { User } from '@prisma/client';


@Injectable()
export class EventsService {
	constructor(private readonly prisma:PrismaService, @Inject('EVENTS_SERVICE') private rabbitClient: ClientProxy){}

	async create(createEventDto: CreateEventDto, user) {
		const events = await this.prisma.event.findFirst({ where:{ authorId:user.id, date: createEventDto.date } })
		if (events){
			throw new HttpException(APP_ERROR.EVENT_EXIST, HttpStatus.BAD_REQUEST)
		}

		return await this.prisma.event.create({ data:{ ...createEventDto, authorId:user.id } })
	}


	async findAll(user: User) {
		return await this.prisma.event.findMany({ where: { authorId: +user.id } });
	}

	async findOne(id: number) {
		return await this.prisma.event.findFirst({ where:{ id:id } })
	}

	async update(updateEventDto: UpdateEventDto) {
		return  await this.prisma.event.update({ where:{ id: updateEventDto.id }, data:{ ...updateEventDto } })
	}

	async remove(id: number) {
		const event = await this.prisma.event.findUnique({ where: { id: id } });

		if (!event) {
			throw new HttpException(APP_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
		}

		return this.prisma.event.delete({ where: { id: id } });
	}

	placeEvent(event:CreateEventDto){
		this.rabbitClient.emit('event-placed', event)

		return { message:'Order Placed!' }
	}
}
