import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { findOneEventDto } from './dto/findOne-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {
    constructor(private prisma: PrismaService) { }

    async create(createEventDto: CreateEventDto) {
        const userExists = await this.checkUserExists(createEventDto.authorId)
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

    async findAll(userId: number) {
        const userExists = await this.checkUserExists(userId)
        if (userExists) {
            const resultFindAll = await this.prisma.event.findMany({
                where: {
                    authorId: userId
                }
            })
            if (resultFindAll != null) {
                return resultFindAll
            } else { throw new NotFoundException("Not found") }
        } else { throw new NotFoundException("User dosen't exists") }
    }

    async findOne(findOneEventDto: findOneEventDto) {
        const userExists = await this.prisma.exists(this.prisma.user, {
            id: findOneEventDto.id,
        })
        if (userExists) {
            const result = await this.prisma.event.findMany({
                where: {
                    OR: [
                        { name: findOneEventDto.name },
                        { id: findOneEventDto.eventId }
                    ]
                }
            })
            if (result != null) {
                return result
            } else { throw new NotFoundException("Not found") }
        } else { throw new NotFoundException("User dosen't exists") }
    }

    async update(userId: number, updateEventDto: UpdateEventDto) {
        const userExists = await this.checkUserExists(userId)
        if (userExists) {
            const resultUpdate = await this.prisma.event.update({
                where: { id: updateEventDto.Id },
                data: updateEventDto
            })
            if(resultUpdate != null){
                return resultUpdate
            } else { throw new NotFoundException("Update has not been completed")}
        } else { throw new NotFoundException("User dosen't exists") }
    }

    async remove(userId: number, eventId: number) {
        const userExists = await this.checkUserExists(userId)
        if (userExists){
            const resultDelete = await this.prisma.event.delete({
                where: {id: eventId}
            })
            if(resultDelete != null){
                return resultDelete
            } else {throw new NotFoundException("Delete has not been complete")}
        }
    }

    public async checkUserExists(userId: number): Promise<Boolean> {
        return this.prisma.exists(this.prisma.user, { id: userId })
    }
}
