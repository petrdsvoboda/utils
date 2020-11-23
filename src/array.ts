import { nil } from './base'
import { compare as compareDate } from './date'
import { compare as compareNumber } from './number'
import * as Record from './record'
import { compare as compareString } from './string'
import { CompareResult } from './types'

type CompareOptions = {
	ascending?: boolean
	isDate?: boolean
}

const compareFn = (a: any, b: any, options?: CompareOptions): CompareResult => {
	if (nil(a) || nil(b)) {
		if (nil(a) && nil(b)) return 0
		else if (nil(a)) return 1
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

export function sort<T extends Record<string, any>, K1 extends keyof T>(
	array: T[],
	options: CompareOptions,
	key1: K1
): T[]
export function sort<
	T extends Record<string, any>,
	K1 extends keyof T,
	K2 extends keyof NonNullable<T[K1]>
>(array: T[], options: CompareOptions, key1: K1, key2: K2): T[]
export function sort<
	T extends Record<string, any>,
	K1 extends keyof T,
	K2 extends keyof NonNullable<T[K1]>,
	K3 extends keyof NonNullable<NonNullable<T[K1]>[K2]>
>(array: T[], options: CompareOptions, key1: K1, key2: K2, key3: K3): T[]
export function sort<
	T extends Record<string, any>,
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
	T extends Record<string, any>,
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
	T extends Record<string, any>,
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
			aVal = Record.get(a, key1)
			bVal = Record.get(b, key1)
		} else if (key3 === undefined) {
			aVal = Record.get(a, key1, key2)
			bVal = Record.get(b, key1, key2)
		} else if (key4 === undefined) {
			aVal = Record.get(a, key1, key2, key3)
			bVal = Record.get(b, key1, key2, key3)
		} else if (key5 === undefined) {
			aVal = Record.get(a, key1, key2, key3, key4)
			bVal = Record.get(b, key1, key2, key3, key4)
		} else {
			aVal = Record.get(a, key1, key2, key3, key4, key5)
			bVal = Record.get(b, key1, key2, key3, key4, key5)
		}

		return compareFn(aVal, bVal, options)
	})
}

export const union = (left: any[], right: any[]): any[] => {
	const arr = left.reduce<any[]>(
		(acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]),
		[]
	)
	return right.reduce<any[]>(
		(acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]),
		arr
	)
}

export const intersection = (left: any[], right: any[]): any[] => {
	return left.reduce<any[]>(
		(acc, curr) => (right.includes(curr) ? acc : [...acc, curr]),
		[]
	)
}

type MergeOptions = {
	unique?: boolean
	common?: boolean
}
export function merge<T = any>(
	left: any[],
	right: any[],
	options?: MergeOptions
): T[] {
	if (options && options.unique) {
		return union(left, right)
	} else if (options && options.common) {
		return intersection(left, right)
	} else {
		return [...left, ...right]
	}
}

type Arr = readonly any[]
export function concat<T = any>(...arrs: Arr[]): T[] {
	const [arr, ...rest] = arrs
	if (!arr) {
		if (rest.length === 0) return []
		return concat(...rest)
	}
	return [...arr, ...concat(...rest)]
}

export type GroupByOptions = {
	isDate?: boolean
}
export const groupBy = <T>(
	rows: T[],
	key: keyof T,
	options?: GroupByOptions
): { [key: string]: T[] } =>
	rows.reduce<{ [key: string]: T[] }>((acc, curr) => {
		const value = Record.get(curr, key)
		if (!value) return acc

		let parsed: string
		if (options?.isDate)
			parsed = new Date(value as any).toLocaleDateString()
		else parsed = (value as unknown) as string

		if (typeof value !== 'string') parsed = (parsed as any).toString()

		const values = Object.keys(acc)
		if (values.includes(parsed)) {
			return Record.update(acc, parsed)(vs => [...vs, curr])
		} else {
			return Record.set(acc, parsed)([curr])
		}
	}, {})
