import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { APP_ERROR } from 'src/common/errors';
import { PrismaService } from 'src/prisma/prisma.service';

import type { CreateEventDto } from './dto/create-event.dto';
import type { UpdateEventDto } from './dto/update-event.dto';
import type { user } from '@prisma/client';


@Injectable()
export class EventsService {
	constructor(private readonly prisma:PrismaService){}

	async create(createEventDto: CreateEventDto, user) {
		return await this.prisma.event.create({ data:{ ...createEventDto, authorId:user.id } })
	}

	async findAll(user: user) {
		return await this.prisma.event.findMany({ where: { authorId: +user.id } });
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
