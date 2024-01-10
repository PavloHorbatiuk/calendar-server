import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
	async exists<T>(
		model: T,
		where: Prisma.Args<T, 'findFirst'>['where']
	): Promise<boolean> {
		const context = Prisma.getExtensionContext(model);

		const result = await (context as any).findFirst({ where });

		return result !== null;
	}
}
