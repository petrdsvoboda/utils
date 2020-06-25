import { nil } from './base'
import { compare as compareDate } from './date'
import { compare as compareNumber } from './number'
import * as Record from './record'
import { compare as compareString } from './string'
import { CompareResult } from './types'

type ArrayGetFn<T, U> = (array?: U) => T | undefined
export function get<T extends any>(index1: number): ArrayGetFn<T, T[]>
export function get<T extends any>(
	index1: number,
	index2: number
): ArrayGetFn<T, T[][]>
export function get<T extends any>(
	index1: number,
	index2?: number
): ArrayGetFn<T, T[]> | ArrayGetFn<T, T[][]> {
	if (index2 === undefined) {
		return (array?: T[]): undefined | T =>
			array === undefined ? undefined : array[index1]
	} else {
		return (array?: T[][]): undefined | T =>
			array === undefined ? undefined : get(index2)(array[index1])
	}
}

type ArraySetFn<T, U> = (value: T) => (array?: U) => U | undefined
export function set<T extends any>(index1: number): ArraySetFn<T, T[]>
export function set<T extends any>(
	index1: number,
	index2: number
): ArraySetFn<T, T[][]>
export function set<T extends any>(
	index1: number,
	index2?: number
): ArraySetFn<T, T[]> | ArraySetFn<T, T[][]> {
	if (index2 === undefined) {
		return (value: T) => (array?: T[]): undefined | T[] => {
			if (array === undefined) return undefined
			return [
				...array.slice(0, index1),
				value,
				...array.slice(index1 + 1)
			]
		}
	} else {
		return (value: T) => (array?: T[][]): undefined | T[][] => {
			if (array === undefined) return undefined
			return [
				...array.slice(0, index1),
				set(index2)(value)(array[index1]) || [],
				...array.slice(index1 + 1)
			]
		}
	}
}

type UpdateFn<T> = (value: T) => T
type ArrayUpdateFn<T, U> = (
	callback: UpdateFn<T>
) => (array?: U) => U | undefined
export function update<T extends any>(index1: number): ArrayUpdateFn<T, T[]>
export function update<T extends any>(
	index1: number,
	index2: number
): ArrayUpdateFn<T, T[][]>
export function update<T extends any>(
	index1: number,
	index2?: number
): ArrayUpdateFn<T, T[]> | ArrayUpdateFn<T, T[][]> {
	if (index2 === undefined) {
		return (callback: UpdateFn<T>) => (array?: T[]): undefined | T[] => {
			if (array === undefined) return undefined
			const value = get(index1)(array)
			if (!value) return array
			return set(index1)(callback(value))(array)
		}
	} else {
		return (callback: UpdateFn<T>) => (
			array?: T[][]
		): undefined | T[][] => {
			if (array === undefined) return undefined
			return [
				...array.slice(0, index1),
				update(index2)(callback)(array[index1]) || [],
				...array.slice(index1 + 1)
			]
		}
	}
}

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

export const union = (left: any[], right: any[]) => {
	const arr = left.reduce<any[]>(
		(acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]),
		[]
	)
	return right.reduce<any[]>(
		(acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]),
		arr
	)
}

export const intersection = (left: any[], right: any[]) => {
	return left.reduce<any[]>(
		(acc, curr) => (right.includes(curr) ? acc : [...acc, curr]),
		[]
	)
}

type MergeOptions = {
	unique?: boolean
	common?: boolean
}
export function merge(
	left: any[],
	right: any[],
	options?: MergeOptions
): any[] {
	if (options && options.unique) {
		return union(left, right)
	} else if (options && options.common) {
		return intersection(left, right)
	} else {
		return [...left, ...right]
	}
}
