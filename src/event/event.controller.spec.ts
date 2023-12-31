import { Test } from '@nestjs/testing';

import { EventController } from './event.controller';
import { EventService } from './event.service';

import type { TestingModule } from '@nestjs/testing';

describe('EventController', () => {
	let controller: EventController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EventController],
			providers: [EventService],
		}).compile();

		controller = module.get<EventController>(EventController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
