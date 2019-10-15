import { compare as compareDate } from './date'
import { compare as compareNumber } from './number'
import { Map, get } from './record'
import { compare as compareString } from './string'
import { CompareResult } from './types'

type CompareOptions = {
	ascending?: boolean
	isDate?: boolean
}

const compareFn = (a: any, b: any, options?: CompareOptions): CompareResult => {
	if (a === undefined || b === undefined) {
		if (a === undefined && b === undefined) return 0
		else if (a === undefined) return 1
		else return -1
	}

	let result: CompareResult = 0
	if (options && options.isDate) {
		result = compareDate(new Date(a), new Date(b))
	} else if (typeof a === 'string' && typeof b === 'string') {
		result = compareString(a, b)
	} else {
		result = compareNumber(a, b)
	}

	if (
		options &&
		options.ascending !== undefined &&
		options.ascending === false
	) {
		result = (result * -1) as CompareResult
	}

	return result
}

export function sort<T extends Map<any>, K1 extends keyof T>(
	array: T[],
	options: CompareOptions,
	key1: K1
): T[]
export function sort<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof NonNullable<T[K1]>
>(array: T[], options: CompareOptions, key1: K1, key2: K2): T[]
export function sort<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof NonNullable<T[K1]>,
	K3 extends keyof NonNullable<NonNullable<T[K1]>[K2]>
>(array: T[], options: CompareOptions, key1: K1, key2: K2, key3: K3): T[]
export function sort<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof NonNullable<T[K1]>,
	K3 extends keyof NonNullable<T[K1][K2]>,
	K4 extends keyof NonNullable<T[K1][K2][K3]>
>(
	array: T[],
	options: CompareOptions,
	key1: K1,
	key2: K2,
	key3: K3,
	key4: K4
): T[]
export function sort<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof NonNullable<T[K1]>,
	K3 extends keyof NonNullable<T[K1][K2]>,
	K4 extends keyof NonNullable<T[K1][K2][K3]>,
	K5 extends keyof NonNullable<T[K1][K2][K3][K4]>
>(
	array: T[],
	options: CompareOptions,
	key1: K1,
	key2: K2,
	key3: K3,
	key4: K4,
	key5: K5
): T[]
export function sort<
	T extends Map<any>,
	K1 extends keyof T,
	K2 extends keyof T[K1],
	K3 extends keyof T[K1][K2],
	K4 extends keyof T[K1][K2][K3],
	K5 extends keyof T[K1][K2][K3][K4]
>(
	array: T[],
	options: CompareOptions,
	key1: K1,
	key2?: K2,
	key3?: K3,
	key4?: K4,
	key5?: K5
): T[] {
	return array.slice().sort((a, b) => {
		let aVal: any
		let bVal: any

		if (key2 === undefined) {
			aVal = get(a, key1)
			bVal = get(b, key1)
		} else if (key3 === undefined) {
			aVal = get(a, key1, key2)
			bVal = get(b, key1, key2)
		} else if (key4 === undefined) {
			aVal = get(a, key1, key2, key3)
			bVal = get(b, key1, key2, key3)
		} else if (key5 === undefined) {
			aVal = get(a, key1, key2, key3, key4)
			bVal = get(b, key1, key2, key3, key4)
		} else {
			aVal = get(a, key1, key2, key3, key4, key5)
			bVal = get(b, key1, key2, key3, key4, key5)
		}

		return compareFn(aVal, bVal, options)
	})
}

type MergeOptions = {
	unique?: boolean
}
export function merge(
	left: any[],
	right: any[],
	options?: MergeOptions
): any[] {
	if (options && options.unique) {
		let arr = left.reduce<any[]>(
			(acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]),
			[]
		)
		return right.reduce<any[]>(
			(acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]),
			arr
		)
	} else {
		return [...left, ...right]
	}
}
