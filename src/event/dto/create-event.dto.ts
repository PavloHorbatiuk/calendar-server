import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @Type(() => Date)
    @IsDateString()
    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    isDone: boolean;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    authorId: number;
}
