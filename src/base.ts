export function nil<T>(value: T | undefined | null): value is null | undefined {
	return value === null || value === undefined
}

export function notNil<T>(value: T | undefined | null): value is T {
	return value !== null && value !== undefined
}
