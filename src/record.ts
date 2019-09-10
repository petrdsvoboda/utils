export type Map<T> = { [key in string]: T }

export function get<T extends Map<any>, K1 extends keyof T>(
	map: T | undefined,
	key1: K1
): T[K1] | undefined
export function get<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof T[K1]
>(map: T | undefined, key1: K1, key2: K2): T[K1][K2] | undefined
export function get<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof T[K1],
	K3 extends keyof T[K1][K2]
>(map: T | undefined, key1: K1, key2: K2, key3: K3): T[K1][K2][K3] | undefined
export function get<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof T[K1],
	K3 extends keyof T[K1][K2],
	K4 extends keyof T[K1][K2][K3]
>(
	map: T | undefined,
	key1: K1,
	key2: K2,
	key3: K3,
	key4: K4
): T[K1][K2][K3][K4] | undefined
export function get<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof T[K1],
	K3 extends keyof T[K1][K2],
	K4 extends keyof T[K1][K2][K3],
	K5 extends keyof T[K1][K2][K3][K4]
>(
	map: T | undefined,
	key1: K1,
	key2: K2,
	key3: K3,
	key4: K4,
	key5: K5
): T[K1][K2][K3][K4][K5] | undefined
export function get<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof T[K1],
	K3 extends keyof T[K1][K2],
	K4 extends keyof T[K1][K2][K3],
	K5 extends keyof T[K1][K2][K4]
>(map: T | undefined, key1: K1, key2?: K2, key3?: K3, key4?: K4, key5?: K5) {
	if (map === undefined) return undefined

	const value = map[key1]
	if (key2 === undefined) return value
	else if (key3 === undefined) return get(value, key2)
	else if (key4 === undefined) return get(value, key2, key3)
	else if (key5 === undefined) return get(value, key2, key3, key4)
	return get(value, key2, key3, key4, key5)
}

export function set<T extends Map<any>, K1 extends keyof T>(
	map: T | undefined,
	value: T[K1],
	key1: K1
): T | undefined
export function set<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof T[K1]
>(map: T | undefined, value: T[K1][K2], key1: K1, key2: K2): T | undefined
export function set<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof T[K1]
>(map: T | undefined, value: T[K1] | T[K1][K2], key1: K1, key2?: K2) {
	if (map === undefined) return undefined

	if (key2 === undefined)
		return {
			...map,
			[key1]: value
		}
	return {
		...map,
		[key1]: set(map[key1], value, key2)
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
