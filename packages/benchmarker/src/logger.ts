import * as Utilities from './utilities';
import * as Lab from '@kinematic-lab/core';
import { consola } from 'consola';

type LoggerOptions = { name?: string; level?: LoggerLevel | number };
type LoggerBuffer = { message?: string; type?: string; time?: number }[];
type LoggerFunction = 'info' | 'warn' | 'error';

enum LoggerLevel {
	VERBOSE,
	INFO,
	WARN,
	ERROR,
	NONE,
}

function Logger(options: LoggerOptions) {
	const name = options.name
		? `[${Utilities.toUppercase(options.name)}] `
		: '';

	const level = +(options.level ?? LoggerLevel.INFO);
	const buffer: LoggerBuffer = [];
	const clock = Lab.Clock();

	function log(message: string, type: LoggerFunction, logLevel: LoggerLevel) {
		logLevel >= level && consola[type]?.(`${name}${message}`);
		buffer.push({ type, message, time: clock.getActualTime() });
	}

	const verbose = (msg: string) => log(msg, 'info', LoggerLevel.VERBOSE);
	const info = (msg: string) => log(msg, 'info', LoggerLevel.INFO);
	const warn = (msg: string) => log(msg, 'warn', LoggerLevel.WARN);
	const error = (msg: string) => log(msg, 'error', LoggerLevel.ERROR);

	return {
		buffer,
		info,
		warn,
		error,
		verbose,
	};
}

export default Logger;
