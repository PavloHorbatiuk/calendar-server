import { Catch, HttpException, Logger } from '@nestjs/common';

import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    logger = new Logger();

    constructor(){}

    catch(exception: HttpException, host: ArgumentsHost) {
    	const ctx = host.switchToHttp();
    	const response = ctx.getResponse<Response>();
    	const request = ctx.getRequest<Request>();
    	const status = exception.getStatus();
    	this.logger.error(
    		`${request.method} ${request.originalUrl} ${status} error: ${exception.message}`
    	);
    	response.status(status).json({
    		statusCode: status,
    		timestamp: new Date().toISOString(),
    		path: request.url,
    		message: exception.message,
    	})
    }
}