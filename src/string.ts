import { intersection } from './array'
import { nil } from './base'
import { CompareFn, CompareResult } from './types'

export const compare: CompareFn<string> = (a, b) =>
	a.localeCompare(b) as CompareResult

export const capitalize = (s: string): string =>
	s.replace(/\b\w/, l => l.toUpperCase())
export const splitByCapitals = (s: string): string[] => s.split(/(?=[A-Z])/)
export const splitCapitalize = (s: string): string =>
	s ? splitByCapitals(capitalize(s)).join(' ') : s

export const splitPath = (value: string): string[] =>
	nil(value)
		? []
		: value
				.split('.')
				.reduce<string[]>(
					(acc, curr, index) => [
						...acc,
						index === 0 ? curr : `${acc[index - 1]}.${curr}`
					],
					[]
				)

export const includes = (
	a: string | string[],
	b: string | string[]
): boolean => {
	if (nil(a) || nil(b)) return false
	if (typeof a === 'string' && typeof b === 'string') {
		return a === b
	} else if (typeof a === 'string') {
		return b.includes(a)
	} else if (typeof b === 'string') {
		return a.includes(b)
	} else {
		return intersection(a, b).length > 0
	}
}
