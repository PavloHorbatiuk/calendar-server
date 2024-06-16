import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    @ApiProperty()
    date: Date;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    isDone: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    isPaid: boolean;
}
