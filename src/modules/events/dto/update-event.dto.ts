import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    id: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    authorId: number;
}
