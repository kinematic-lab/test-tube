import * as Lab from '@kinematic-lab/core';
import benchmark from '../dist/index.mjs';

const ease = Lab.CubicBezier(0.6, 0, 0.4, 1);
benchmark((n) => ease((n / 100) % 1), {
	name: 'Lab.CubicBezier',
	start: 10000,
	multiplier: 10,
	iterations: 5,
});
