import * as Utilities from './utilities';
import * as Lab from '@kinematic-lab/core';
import Logger from './logger';

interface BenchmarkOptions {
	name: string;
	start?: number;
	multiplier?: number;
	iterations?: number;
	log?: number;
}

function benchmark(runtime: (i: number) => void, options?: BenchmarkOptions) {
	const start = options?.start ?? 100;
	const multiplier = options?.multiplier ?? 100;
	const iterations = options?.iterations ?? 3;

	const clock = Lab.Clock();
	const logger = Logger({
		name: options?.name,
		level: options?.log ?? 1,
	});

	for (let i = 0; i < iterations; i++) {
		const n = start * Math.pow(multiplier, i);
		clock.reset();

		for (let j = 0; j < n; j++) runtime(i);
		let delta = clock.getDelta();

		logger.info(
			[
				'Runtime: ',
				`${Utilities.leftPad(delta.toFixed(4), 20)}ms`,
				`${Utilities.leftPad(n.toLocaleString(), 20)} iterations`,
			].join('')
		);
	}

	return logger.buffer;
}

export default benchmark;
