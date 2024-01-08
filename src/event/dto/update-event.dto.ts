import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateEventDto extends PartialType(CreateEventDto) {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    Id: number
}
