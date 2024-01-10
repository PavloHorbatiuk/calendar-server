import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class FindOneEventDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    id: number;

    @IsDateString()
    @IsNotEmpty()
    @IsDate()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    eventId: number;
}
