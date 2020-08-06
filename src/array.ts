import { nil } from './base'
import { compare as compareDate } from './date'
import { compare as compareNumber } from './number'
import { compare as compareString } from './string'
import { CompareResult } from './types'

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
		result = compareDate(new Date(a), new Date(b))
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

export const sort = <T extends Record<string, any>>(
	key: keyof T,
	options?: CompareOptions
) => (arr: T[]): T[] =>
	arr.slice().sort((a, b) => compareFn(a?.[key], b?.[key], options))

export const unique = <T>(arr: T[]): T[] =>
	arr.filter((x, i) => arr.indexOf(x) === i)

export const union = <T>(left: T[], right: T[]): T[] =>
	unique([...left, ...right])

export const intersection = <T>(left: T[], right: T[]): T[] =>
	left.reduce<T[]>(
		(acc, curr) => (right.includes(curr) ? acc : [...acc, curr]),
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
