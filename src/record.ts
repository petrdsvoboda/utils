import { merge as mergeArray } from './array'
import { notNil } from './base'
import { Path, Prop } from './types'

export function get<T, P extends Path<T>>(obj: T, path: P): Prop<T, P> {
	return (path as string[]).reduce(
		(acc, curr) => (acc as any)?.[curr],
		obj
	) as any
}

export function set<T, P extends Path<T>>(
	obj: T,
	path: P,
	value: Prop<T, P>
): T {
	if (!path) return obj
	const [head, ...tail] = path
	if (!head) return obj
	if (tail.length === 0) {
		return {
			...obj,
			[head]: value
		}
	} else {
		if (!obj?.[head]) return obj
		return {
			...obj,
			[head]: set(obj[head] as any, tail as any, value)
		}
	}
}

export function update<T, P extends Path<T>>(
	obj: T,
	path: P,
	updateFn: (value: Prop<T, P>) => any
): T {
	if (!path) return obj
	const [head, ...tail] = path
	if (!head) return obj
	if (tail.length === 0) {
		return {
			...obj,
			[head]: updateFn(obj?.[head] as any)
		}
	} else {
		if (!obj?.[head]) return obj
		return {
			...obj,
			[head]: update(obj[head] as any, tail as any, updateFn)
		}
	}
}

type MergeOptions = { preserveNil: boolean }
export function merge(
	left: undefined,
	right: undefined,
	options?: MergeOptions
): undefined
export function merge<T extends Record<string, unknown>>(
	left: T,
	right: undefined,
	options?: MergeOptions
): T
export function merge<U extends Record<string, unknown>>(
	left: undefined,
	right: U,
	options?: MergeOptions
): U
export function merge<
	T extends Record<string, unknown>,
	U extends Record<string, unknown>
>(left: T, right: U, options?: MergeOptions): T & U
export function merge<
	T extends Record<string, unknown>,
	U extends Record<string, unknown>
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
	callback: (value: T, index?: number) => T
): Record<string, T>
export function map<T, U>(
	record: Record<string, T>,
	callback: (value: T, index?: number) => U
): Record<string, U>
export function map<T, U>(
	record: Record<string, T>,
	callback: (value: T, index?: number) => T | U
): Record<string, T | U> {
	return Object.keys(record).reduce<Record<string, T | U>>(
		(acc, curr, index) => ({
			...acc,
			[curr]: callback(record[curr], index)
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

export function fromArray<T, K extends keyof T>(
	arr: T[],
	options: {
		key: K
		loseKey?: false
	}
): Record<string, T>
export function fromArray<T, K extends keyof T>(
	arr: T[],
	options: {
		key: K
		loseKey: true
	}
): Record<string, Omit<T, K>>
export function fromArray<T, K extends keyof T>(
	arr: T[],
	options: { key: K; loseKey?: boolean }
): Record<string, T | Omit<T, K>> {
	const { key, loseKey } = options
	return arr.reduce((acc, curr) => {
		const index = curr[key]
		if (loseKey) {
			const { [key]: _, ...rest } = curr
			return {
				...acc,
				[index as any]: rest
			}
		} else {
			return {
				...acc,
				[index as any]: curr
			}
		}
	}, {})
}

export const toArray = <T extends any>(record: Record<string, T>): T[] =>
	Object.values(record).filter(notNil)
