import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto";
import * as bcrypt from 'bcrypt'
import { AppError } from "src/common/errors";



@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findUserByEmail(email:string){
        return this.prisma.user.findFirst({where:{email}})
    }

    async hashPassword(password: string) {
        return bcrypt.hash(password, 10)
    }

    async createUser(dto: CreateUserDTO):Promise<CreateUserDTO> {
        const existUser = await this.findUserByEmail(dto.email)
        if( existUser) throw new BadRequestException(AppError.USER_EXIST)
        dto.password = await this.hashPassword(dto.password)
        await this.prisma.user.create({ data: dto })
        return dto
    }


}