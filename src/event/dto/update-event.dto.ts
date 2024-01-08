import { PartialType, ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty, IsNumber } from "class-validator";

import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    Id: number
}
