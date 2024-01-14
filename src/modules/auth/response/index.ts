import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AuthUserResponse {
    @ApiProperty()
    @IsNumber()
    id?: number;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    name: string | null;

    @ApiProperty()
    @IsString()
    password?: string;

    @ApiProperty()
    @IsString()
    token:string
}