import {  HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { APP_ERROR } from 'src/common/errors';
import { PrismaService } from 'src/prisma/prisma.service';

import type { CreateEventDto } from './dto/create-event.dto';
import type { UpdateEventDto } from './dto/update-event.dto';
import type { user } from '@prisma/client';
import { Cache } from 'cache-manager';
import { EventSchema } from './entities/event.entity';


@Injectable()
export class EventsService {
	constructor(private readonly prisma:PrismaService, @Inject('CACHE_MANAGER') private cacheManager: Cache){}

	async create(createEventDto: CreateEventDto, user) {
		const events = await this.prisma.event.findFirst({where:{authorId:user.id, date: createEventDto.date}})
		if(events){
			throw new HttpException(APP_ERROR.EVENT_EXIST, HttpStatus.BAD_REQUEST) 
		}
		return await this.prisma.event.create({ data:{ ...createEventDto, authorId:user.id } })
	}


	async findAll(user: user) {
		const cacheKey = `events:${user.id}`
		let events:EventSchema[] = await this.cacheManager.get(cacheKey)
		if(!events){
			events =  await this.prisma.event.findMany({ where: { authorId: +user.id } });
			await this.cacheManager.set(cacheKey, events)
		}
		return events
	}

	async findOne(id: number) {
		return await this.prisma.event.findFirst({ where:{ id:id } })
	}

	async update(id: number, updateEventDto: UpdateEventDto) {
		return  await this.prisma.event.update({ where:{ id:id },data:{ ...updateEventDto } })
	}

	async remove(id: number) {
		const event = await this.prisma.event.findUnique({ where: { id: id } });

		if (!event) {
			throw new HttpException(APP_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
		}

		return this.prisma.event.delete({ where: { id: id } });
	}

}
