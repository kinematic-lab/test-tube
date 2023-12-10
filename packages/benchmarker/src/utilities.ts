export function toUppercase(value: string) {
	return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

export function leftPad(value: string, length: number, char: string = ' ') {
	return `${char.repeat(length)}${value}`.slice(-length);
}

export function rightPad(value: string, length: number, char: string = ' ') {
	return `${value}${char.repeat(length)}`.slice(length);
}
