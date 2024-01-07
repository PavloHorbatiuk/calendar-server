import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class findOneEventDto {
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
