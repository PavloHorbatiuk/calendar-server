import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {findOneEventDto} from './dto/findOne-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {
    constructor(private prisma: PrismaService) { }

    async create(createEventDto: CreateEventDto) {
        const userExists = await this.prisma.exists(this.prisma.user, {
            id: createEventDto.authorId,
        })
        console.log(userExists);


        const isSameTime = await this.prisma.exists(this.prisma.event, { date: createEventDto.date })

        if (isSameTime) {
            throw new NotFoundException("in this date and time already lessons exists")
        }
        if (userExists) {
            return this.prisma.event.create({ data: createEventDto })
        } else {
            throw new NotFoundException("User dosen't exists")
        }
    }

    async findAll(authorId: number) {
        const userExists = await this.prisma.exists(this.prisma.user, {
            id: authorId,
        })

        if (userExists) {
            return this.prisma.event.findMany()
        } else {
            throw new NotFoundException("User dosen't exists")
        }
    }

    async findOne(findOneEventDto: findOneEventDto) {
        const userExists = await this.prisma.exists(this.prisma.user, {
            id: findOneEventDto.id,
        })

        if (userExists) {
            const eventTrue = await this.prisma.exists(this.prisma.event, {
                OR: [
                    { name: findOneEventDto.name },
                    { id: findOneEventDto.eventId}
                ]
            })
            if (eventTrue) {
                return this.prisma.event.findMany({
                    where: {
                        OR: [
                            { name: findOneEventDto.name },
                            { id: findOneEventDto.eventId}
                        ]
                    }
                })
            } else { throw new NotFoundException("нема такої статі") }
        } else { throw new NotFoundException("User dosen't exists") }
    }
    update(id: number, updateEventDto: UpdateEventDto) {
        return `This action updates a #${id} event`;
    }

    remove(id: number) {
        return `This action removes a #${id} event`;
    }
}
