import {
    Body,
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { AuthEntity } from './entity/auth.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserCreateInputWithHashedPassword } from './types/types';

  @Injectable()
  export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  
    async login(email: string, password: string): Promise<AuthEntity> {
      const user = await this.prisma.user.findUnique({ where: { email: email } });
  
      if (!user) {
        throw new NotFoundException(`No user found for email: ${email}`);
      }
  
      const isPasswordValid = user.password === password;
  
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }
  
      return {
        accessToken: this.jwtService.sign({ userId: user.id }),
      };
    }

    async addUser(@Body('email') email:string, @Body("password") password:string):Promise<AuthEntity>{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData: UserCreateInputWithHashedPassword = {
            email,
          password :  hashedPassword,
          };
        const user = await this.prisma.user.create({ data:userData})

        return{
            accessToken: this.jwtService.sign({ userId: user.id }),
        }
    }
  }