import { merge as mergeArray } from './array'
import { nil, notNil } from './base'

export function set<T extends Record<string, any>, K1 extends keyof T>(
	key1: K1
): (value: T[K1]) => (record: T | undefined) => T
export function set<
	T extends Record<string, any>,
	K1 extends keyof T,
	K2 extends keyof NonNullable<T[K1]>
>(key1: K1, key2: K2): (value: T[K1][K2]) => (record: T | undefined) => T
export function set<
	T extends Record<string, any>,
	K1 extends keyof T,
	K2 extends keyof NonNullable<T[K1]>,
	K3 extends keyof NonNullable<T[K1][K2]>
>(
	key1: K1,
	key2: K2,
	key3: K3
): (value: T[K1][K2][K3]) => (record: T | undefined) => T
export function set<
	T extends Record<string, any>,
	K1 extends keyof T,
	K2 extends keyof NonNullable<T[K1]>,
	K3 extends keyof NonNullable<T[K1][K2]>,
	K4 extends keyof NonNullable<T[K1][K2][K3]>
>(
	key1: K1,
	key2: K2,
	key3: K3,
	key4: K4
): (value: T[K1][K2][K3][K4]) => (record: T | undefined) => T
export function set<
	T extends Record<string, any>,
	K1 extends keyof T,
	K2 extends keyof NonNullable<T[K1]>,
	K3 extends keyof NonNullable<T[K1][K2]>,
	K4 extends keyof NonNullable<T[K1][K2][K3]>,
	K5 extends keyof NonNullable<T[K1][K2][K3][K4]>
>(
	key1: K1,
	key2: K2,
	key3: K3,
	key4: K4,
	key5: K5
): (value: T[K1][K2][K3][K4][K5]) => (record: T | undefined) => T
export function set<
	T extends Record<string, any>,
	K1 extends keyof T,
	K2 extends keyof NonNullable<T[K1]>,
	K3 extends keyof NonNullable<T[K1][K2]>,
	K4 extends keyof NonNullable<T[K1][K2][K3]>,
	K5 extends keyof NonNullable<T[K1][K2][K3][K4]>
>(
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
) => (record: T | undefined) => T | undefined {
	return (
		value:
			| T[K1]
			| T[K1][K2]
			| T[K1][K2][K3]
			| T[K1][K2][K3][K4]
			| T[K1][K2][K3][K4][K5]
	) => (record: T | undefined): T | undefined => {
		if (nil(record)) return undefined

		if (key2 === undefined) {
			return {
				...record,
				[key1]: value
			}
		} else if (key3 === undefined) {
			return {
				...record,
				[key1]: set<T[K1], K2>(key2)(value)(record[key1])
			}
		} else if (key4 === undefined) {
			return {
				...record,
				[key1]: set<T[K1], K2, K3>(key2, key3)(value)(record[key1])
			}
		} else if (key5 === undefined) {
			return {
				...record,
				[key1]: set<T[K1], K2, K3, K4>(key2, key3, key4)(value)(
					record[key1]
				)
			}
		} else {
			return {
				...record,
				[key1]: set<T[K1], K2, K3, K4, K5>(
					key2,
					key3,
					key4,
					key5
				)(value)(record[key1])
			}
		}
	}
}

type UpdateFn<T> = (value: T) => T
export function update<T extends Record<string, any>, K1 extends keyof T>(
	key1: K1
): (callback: UpdateFn<NonNullable<T[K1]>>) => (record: T | undefined) => T
export function update<
	T extends Record<string, any>,
	K1 extends keyof T,
	K2 extends keyof NonNullable<T[K1]>
>(
	key1: K1,
	key2: K2
): (
	callback: UpdateFn<NonNullable<NonNullable<T[K1]>[K2]>>
) => (record: T | undefined) => T
export function update<
	T extends Record<string, any>,
	K1 extends keyof T,
	K2 extends keyof NonNullable<T[K1]>,
	K3 extends keyof NonNullable<T[K1][K2]>
>(
	key1: K1,
	key2: K2,
	key3: K3
): (
	callback: UpdateFn<NonNullable<NonNullable<NonNullable<T[K1]>[K2]>[K3]>>
) => (record: T | undefined) => T
export function update<
	T extends Record<string, any>,
	K1 extends keyof T,
	K2 extends keyof NonNullable<T[K1]>,
	K3 extends keyof NonNullable<T[K1][K2]>,
	K4 extends keyof NonNullable<T[K1][K2][K3]>
>(
	key1: K1,
	key2: K2,
	key3: K3,
	key4: K4
): (
	callback: UpdateFn<
		NonNullable<NonNullable<NonNullable<NonNullable<T[K1]>[K2]>[K3]>[K4]>
	>
) => (record: T | undefined) => T
export function update<
	T extends Record<string, any>,
	K1 extends keyof T,
	K2 extends keyof NonNullable<T[K1]>,
	K3 extends keyof NonNullable<T[K1][K2]>,
	K4 extends keyof NonNullable<T[K1][K2][K3]>,
	K5 extends keyof NonNullable<T[K1][K2][K3][K4]>
>(
	key1: K1,
	key2: K2,
	key3: K3,
	key4: K4,
	key5: K5
): (
	callback: UpdateFn<
		NonNullable<
			NonNullable<
				NonNullable<NonNullable<NonNullable<T[K1]>[K2]>[K3]>[K4]
			>[K5]
		>
	>
) => (record: T | undefined) => T
export function update<
	T extends Record<string, any>,
	K1 extends keyof T,
	K2 extends keyof NonNullable<T[K1]>,
	K3 extends keyof NonNullable<T[K1][K2]>,
	K4 extends keyof NonNullable<T[K1][K2][K3]>,
	K5 extends keyof NonNullable<T[K1][K2][K3][K4]>
>(
	key1: K1,
	key2?: K2,
	key3?: K3,
	key4?: K4,
	key5?: K5
): (
	callback:
		| UpdateFn<NonNullable<T[K1]>>
		| UpdateFn<NonNullable<NonNullable<T[K1]>[K2]>>
		| UpdateFn<NonNullable<NonNullable<NonNullable<T[K1]>[K2]>[K3]>>
		| UpdateFn<
				NonNullable<
					NonNullable<NonNullable<NonNullable<T[K1]>[K2]>[K3]>[K4]
				>
		  >
		| UpdateFn<
				NonNullable<
					NonNullable<
						NonNullable<NonNullable<NonNullable<T[K1]>[K2]>[K3]>[K4]
					>[K5]
				>
		  >
) => (record: T | undefined) => T | undefined {
	return callback => (record): T | undefined => {
		if (nil(record)) return undefined

		if (key2 === undefined) {
			const value = record[key1]
			if (value === undefined) return record
			return set<T, K1>(key1)(callback(value))(record)
		} else if (key3 === undefined) {
			const value = record[key1]?.[key2]
			if (value === undefined) return record
			return set<T, K1, K2>(key1, key2)(callback(value))(record)
		} else if (key4 === undefined) {
			const value = record[key1]?.[key2]?.[key3]
			if (value === undefined) return record
			return set<T, K1, K2, K3>(key1, key2, key3)(callback(value))(record)
		} else if (key5 === undefined) {
			const value = record[key1]?.[key2]?.[key3]?.[key4]
			if (value === undefined) return record
			return set<T, K1, K2, K3, K4>(
				key1,
				key2,
				key3,
				key4
			)(callback(value))(record)
		} else {
			const value = record[key1]?.[key2]?.[key3]?.[key4]?.[key5]
			if (value === undefined) return record
			return set<T, K1, K2, K3, K4, K5>(
				key1,
				key2,
				key3,
				key4,
				key5
			)(callback(value))(record)
		}
	}
}

export const toArray = <T extends any>(record: Record<string, T>): T[] =>
	Object.values(record).filter(notNil)

type MergeOptions = { preserveNil: boolean }
export function merge<
	T extends Record<string, any>,
	U extends Record<string, any>
>(left: undefined, right: undefined, options?: MergeOptions): undefined
export function merge<
	T extends Record<string, any>,
	U extends Record<string, any>
>(left: T, right: undefined, options?: MergeOptions): T
export function merge<
	T extends Record<string, any>,
	U extends Record<string, any>
>(left: undefined, right: U, options?: MergeOptions): U
export function merge<
	T extends Record<string, any>,
	U extends Record<string, any>
>(left: T, right: U, options?: MergeOptions): T & U
export function merge<
	T extends Record<string, any>,
	U extends Record<string, any>
>(
	left: T | undefined,
	right: U | undefined,
	options?: MergeOptions
): T | U | (T & U) | undefined {
	if (left === undefined && right === undefined) return undefined
	if (left === undefined) return right
	if (right === undefined) {
		if (options?.preserveNil) {
			if (
				['boolean', 'string', 'number'].includes(typeof left) ||
				left instanceof Date
			) {
				return undefined
			} else {
				return left
			}
		} else {
			return left
		}
	}

	return Object.keys(right).reduce((acc, curr) => {
		const leftVal: any = left[curr]
		const rightVal: any = right[curr]
		let currVal: any

		if (Array.isArray(leftVal) && Array.isArray(rightVal)) {
			currVal = mergeArray(leftVal, rightVal)
		} else if (Array.isArray(rightVal)) {
			currVal = [...rightVal]
		} else if (
			typeof leftVal === 'object' &&
			typeof rightVal === 'object'
		) {
			currVal = merge(leftVal, rightVal)
		} else if (typeof rightVal === 'object') {
			currVal = { ...rightVal }
		} else {
			currVal = rightVal
		}

		return {
			...acc,
			[curr]: currVal
		}
	}, left)
}

export function map<T>(
	record: Record<string, T>,
	callback: (value: T) => T
): Record<string, T>
export function map<T, U>(
	record: Record<string, T>,
	callback: (value: T) => U
): Record<string, U>
export function map<T, U>(
	record: Record<string, T>,
	callback: (value: T) => T | U
): Record<string, T | U> {
	return Object.keys(record).reduce<Record<string, T | U>>(
		(acc, curr) => ({
			...acc,
			[curr]: callback(record[curr])
		}),
		record
	)
}

export function reduce<T, U>(
	record: Record<string, T>,
	callback: (acc: U, curr: T, index: string) => U,
	initialValue: U
): U {
	return Object.keys(record).reduce<U>(
		(acc, curr) => callback(acc, record[curr], curr),
		initialValue
	)
}
