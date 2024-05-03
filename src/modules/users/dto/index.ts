import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    password: string;
}

export class UpdateUserDto{
	@IsString()
	@MinLength(2)
    @IsNotEmpty()
	@ApiProperty()
	name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

	@IsString()
    @IsNotEmpty()
    @ApiProperty()
    token: string;
}