import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ExtendsHook, DefaultArgs, InternalArgs } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super();
      }

      async exists<T>(
        model: T,
        where: Prisma.Args<T, 'findFirst'>['where']
      ): Promise<boolean> {
        const context = Prisma.getExtensionContext(model);
    
        const result = await (context as any).findFirst({ where });
        return result !== null;
      }
}
