import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';

export class UserResponse {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  isDone: boolean;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsObject()
  date: Date;

  @ApiProperty()
  @IsNumber()
  authorId: number;
}
