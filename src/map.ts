import { notNil } from './base'

export type Map<T> = { [key in string]: T }
export type GenericMap<T, U extends string> = { [key in U]: T }

export function update<T extends Map<any>>(
	map: T
): <K extends keyof T>(id: K, updateCallback: (value: T[K]) => T[K]) => T
export function update<T extends Map<any>>(map: T) {
	return <K extends keyof T>(
		id: K,
		updateCallback: (value: T[K]) => T[K]
	): T => {
		const value = map[id]
		if (!value) return map
		const updatedItem = updateCallback(value)
		return updateMap(map, ({ [id]: updatedItem } as unknown) as Partial<T>)
	}
}

export const toArray = <T>(map: Map<T> | GenericMap<T, any>): T[] =>
	Object.values(map).filter(notNil)

export const updateMap = <T extends Map<any>>(
	oldMap: T,
	newMap: Partial<T>
): T => ({
	...oldMap,
	...newMap
})
export const updateIn = <T extends Map<any>>(
	map: T,
	keys: string[],
	updateCallback: (value: any) => any
): T => {
	const key = keys[0] as keyof T
	if (keys.length < 1) {
		return map
	} else if (keys.length === 1) {
		return update(map)(key, updateCallback)
	} else {
		return update(map)(key, value =>
			updateIn(value, keys.slice(1, keys.length), updateCallback)
		)
	}
}

const compare = (a: number | Date, b: number | Date) =>
	a < b ? -1 : a > b ? 1 : 0

type CompareResult = -1 | 0 | 1
export const sortMap = <T extends Map<any>>(array: T[]) => <K extends keyof T>(
	key: K,
	options?: {
		ascending?: boolean
		isDate?: boolean
	}
) => {
	const compareFn = (a: T, b: T): CompareResult => {
		let result: CompareResult
		if (options && options.isDate) {
			result = compare(new Date(a[key]), new Date(b[key]))
		} else if (typeof a[key] === 'string') {
			result = a[key].localeCompare(b[key])
		} else {
			result = compare(a[key], b[key])
		}
		return (result *
			(options && options.ascending ? 1 : -1)) as CompareResult
	}
	return array.slice().sort(compareFn)
}
export const sortMap2 = <T extends Map<any>>(array: NonNullable<T>[]) => <
	K extends keyof NonNullable<T>,
	L extends keyof NonNullable<NonNullable<T>[K]>
>(
	key: K,
	key2: L,
	options?: {
		ascending?: boolean
		isDate?: boolean
	}
) => {
	const compareFn = (a: NonNullable<T>, b: NonNullable<T>): CompareResult => {
		const valA = a[key][key2]
		const valB = b[key][key2]
		let result: CompareResult
		if (options && options.isDate) {
			result = compare(new Date(valA), new Date(valB))
		} else if (typeof valA === 'string') {
			result = valA.localeCompare(valB) as CompareResult
		} else {
			result = compare(valA, valB)
		}
		return (result *
			(options && options.ascending ? 1 : -1)) as CompareResult
	}
	return array.slice().sort(compareFn)
}
