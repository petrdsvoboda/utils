export type Map<T> = { [key in string]: T }

export function get<T extends Map<any>>(
	map: T | undefined
): <K1 extends keyof T>(path: [K1]) => T[K1] | undefined
export function get<T extends Map<any>>(
	map: T | undefined
): <K1 extends keyof T, K2 extends keyof T[K1]>(
	path: [K1, K2]
) => T[K1][K2] | undefined
export function get<T extends Map<any>>(map: T | undefined) {
	return <K1 extends keyof T, K2 extends keyof T[K1]>(
		path: [K1] | [K1, K2]
	) => {
		const [id, ...rest] = path
		if (map === undefined) return undefined

		const value = map[id]
		if (rest === undefined || rest.length === 0) return value
		return get(value)(rest)
	}
}

export function update<T extends Map<any>, K1 extends keyof T>(
	map: T,
	path: [K1],
	callback: (value: T[K1]) => T[K1]
): T {
	const value = map[path[0]]
	if (!value) return map

	const updatedValue = callback(value)
	return {
		...map,
		[path[0]]: updatedValue
	}
}
