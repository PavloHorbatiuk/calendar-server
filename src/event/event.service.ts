import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) { }

  async create(createEventDto: CreateEventDto) {
    const userExists = await this.prisma.exists(this.prisma.user,{
      id: createEventDto.authorId,
    })
    
    const isSameTime = await this.prisma.exists(this.prisma.event,{date:createEventDto.date})

    if(isSameTime){
      throw new NotFoundException("in this date and time already lessons exists")
    }
    if (userExists) {
      return this.prisma.event.create({ data: createEventDto })
    } else {
      throw new NotFoundException("User dosen't exists")
    }
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
