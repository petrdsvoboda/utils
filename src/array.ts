import { nil } from './base'
import { compare as compareDate, toLocalDate } from './date'
import { compare as compareNumber } from './number'
import { get, set, update } from './record'
import { compare as compareString } from './string'
import { CompareResult, Path } from './types'

type CompareOptions = {
	ascending?: boolean
	isDate?: boolean
}
const compareFn = (
	a: unknown,
	b: unknown,
	options?: CompareOptions
): CompareResult => {
	if (nil(a) || nil(b)) {
		if (nil(a) && nil(b)) return 0
		else if (nil(a)) return 1
		else return -1
	}

	let result: CompareResult = 0
	if (options && options.isDate) {
		result = compareDate(new Date(a as any), new Date(b as any))
	} else if (typeof a === 'string' && typeof b === 'string') {
		result = compareString(a, b)
	} else if (typeof a === 'number' && typeof b === 'number') {
		result = compareNumber(a, b)
	} else {
		result = a === b ? 0 : a ? -1 : 1
	}

	if (options?.ascending === false) result = (result * -1) as CompareResult
	return result
}

export const sort = <T extends Record<string, unknown>>(
	arr: T[],
	path: Path<T>,
	options?: CompareOptions
): T[] =>
	arr.slice().sort((a, b) => compareFn(get(a, path), get(b, path), options))

export const unique = <T>(arr: T[]): T[] =>
	arr.filter((x, i) => arr.indexOf(x) === i)

export const union = <T>(left: T[], right: T[]): T[] =>
	unique([...left, ...right])

export const intersection = <T>(left: T[], right: T[]): T[] =>
	left.reduce<T[]>(
		(acc, curr) =>
			right.includes(curr) && !acc.includes(curr) ? [...acc, curr] : acc,
		[]
	)

type MergeOptions = {
	unique?: boolean
	common?: boolean
}
export const merge = <T>(
	left: T[],
	right: T[],
	options?: MergeOptions
): T[] => {
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
	keyFn: (value: any) => string
}
export const groupBy = <T>(
	rows: T[],
	key: Path<T>,
	options?: GroupByOptions
): { [key: string]: T[] } =>
	rows.reduce<{ [key: string]: T[] }>((acc, curr) => {
		const value = get(curr, key)
		if (!value) return acc

		let parsed: string
		if (options?.isDate) parsed = toLocalDate(value as any) as any
		else if (options?.keyFn) parsed = options.keyFn(value as any)
		else parsed = (value as unknown) as string

		if (typeof value !== 'string') parsed = (parsed as any).toString()

		const values = Object.keys(acc)
		if (values.includes(parsed)) {
			return update(acc, [parsed], vs => [...vs, curr])
		} else {
			return set(acc, [parsed], [curr])
		}
	}, {})
