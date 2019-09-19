import { notNil } from './base'

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
	K5 extends keyof T[K1][K2][K3][K4]
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
	key1: K1
): (value: T[K1]) => T
export function set<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof T[K1]
>(map: T | undefined, key1: K1, key2: K2): (value: T[K1][K2]) => T
export function set<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof T[K1],
	K3 extends keyof T[K1][K2]
>(map: T | undefined, key1: K1, key2: K2, key3: K3): (value: T[K1][K2][K3]) => T
export function set<
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
): (value: T[K1][K2][K3][K4]) => T
export function set<
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
): (value: T[K1][K2][K3][K4][K5]) => T
export function set<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof T[K1],
	K3 extends keyof T[K1][K2],
	K4 extends keyof T[K1][K2][K3],
	K5 extends keyof T[K1][K2][K3][K4]
>(
	map: T | undefined,
	key1: K1,
	key2?: K2,
	key3?: K3,
	key4?: K4,
	key5?: K5
): (
	value:
		| T[K1]
		| T[K1][K2]
		| T[K1][K2][K3]
		| T[K1][K2][K3][K4]
		| T[K1][K2][K3][K4][K5]
) => T | undefined {
	return (
		value:
			| T[K1]
			| T[K1][K2]
			| T[K1][K2][K3]
			| T[K1][K2][K3][K4]
			| T[K1][K2][K3][K4][K5]
	) => {
		if (map === undefined) return map

		if (key2 === undefined) {
			return {
				...map,
				[key1]: value
			}
		} else if (key3 === undefined) {
			return {
				...map,
				[key1]: set<T[K1], K2>(map[key1], key2)(value)
			}
		} else if (key4 === undefined) {
			return {
				...map,
				[key1]: set<T[K1], K2, K3>(map[key1], key2, key3)(value)
			}
		} else if (key5 === undefined) {
			return {
				...map,
				[key1]: set<T[K1], K2, K3, K4>(map[key1], key2, key3, key4)(
					value
				)
			}
		} else {
			return {
				...map,
				[key1]: set<T[K1], K2, K3, K4, K5>(
					map[key1],
					key2,
					key3,
					key4,
					key5
				)(value)
			}
		}
	}
}

type UpdateFn<T> = (value: T) => T
export function update<T extends Map<any>, K1 extends keyof T>(
	map: T | undefined,
	key1: K1
): (callback: UpdateFn<T[K1]>) => T
export function update<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof T[K1]
>(map: T | undefined, key1: K1, key2: K2): (callback: UpdateFn<T[K1][K2]>) => T
export function update<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof T[K1],
	K3 extends keyof T[K1][K2]
>(
	map: T | undefined,
	key1: K1,
	key2: K2,
	key3: K3
): (callback: UpdateFn<T[K1][K2][K3]>) => T
export function update<
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
): (callback: UpdateFn<T[K1][K2][K3][K4]>) => T
export function update<
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
): (callback: UpdateFn<T[K1][K2][K3][K4][K5]>) => T
export function update<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof T[K1],
	K3 extends keyof T[K1][K2],
	K4 extends keyof T[K1][K2][K3],
	K5 extends keyof T[K1][K2][K3][K4]
>(
	map: T,
	key1: K1,
	key2?: K2,
	key3?: K3,
	key4?: K4,
	key5?: K5
): (
	callback: UpdateFn<
		| T[K1]
		| T[K1][K2]
		| T[K1][K2][K3]
		| T[K1][K2][K3][K4]
		| T[K1][K2][K3][K4][K5]
	>
) => T {
	return callback => {
		if (map === undefined) return map

		if (key2 === undefined) {
			const value = get(map, key1)
			if (value === undefined) return map
			// TODO fix any?
			return set(map, key1)(callback(value) as any)
		} else if (key3 === undefined) {
			const value = get(map, key1, key2)
			if (value === undefined) return map
			return set(map, key1, key2)(callback(value))
		} else if (key4 === undefined) {
			const value = get(map, key1, key2, key3)
			if (value === undefined) return map
			return set(map, key1, key2, key3)(callback(value))
		} else if (key5 === undefined) {
			const value = get(map, key1, key2, key3, key4)
			if (value === undefined) return map
			return set(map, key1, key2, key3, key4)(callback(value))
		} else {
			const value = get(map, key1, key2, key3, key4, key5)
			if (value === undefined) return map
			return set(map, key1, key2, key3, key4, key5)(callback(value))
		}
	}
}

export const toArray = <T>(map: Map<T>): T[] =>
	Object.values(map).filter(notNil)
