import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exeption-filters/http.exceprtion-filter';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('crm')
		.setDescription('The CRM API description')
		.setVersion('0.1')
		.addTag('API')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	app.enableCors({
		allowedHeaders: ['Content-Type', 'Authorization'],
		origin: 'http://localhost:3000',
		credentials: true,
	});
	const PORT = process.env.PORT || 5000;
	app.useGlobalPipes(new ValidationPipe({
		whitelist:true,
		forbidNonWhitelisted:true,
		disableErrorMessages:true
	}))

	app.useGlobalFilters(new HttpExceptionFilter())
	await app.listen(PORT);

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}

bootstrap();