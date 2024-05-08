import { Injectable, Logger } from '@nestjs/common';

import type { NestMiddleware } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    logger = new Logger('Response')

    constructor(){}

    use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: (error?: any) => void) {
    	const { method, url } = req;
    	const reqTime = new Date().getTime();
    	res.on('finish', ()=>{
    		const { statusCode } = res;
    		const resTime = new Date().getTime();
    		if (statusCode === 201 || statusCode === 200){
    			this.logger.log(
    				`${method} ${url} ${statusCode} - ${resTime - reqTime} ms`
    			)
    		}
    	})
    	next()
    }
}
