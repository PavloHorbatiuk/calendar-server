import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './createUser.dto';

export class LoginDto extends PartialType(CreateUserDto) {}
