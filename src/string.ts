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

export const toString = (x: unknown): string | undefined => {
	if (typeof x === 'string') return x
	else if (typeof x === 'number') return x.toString()
	else if (x instanceof Date) return x.toLocaleString('cs')
	else return
}

export const normalize = (s: string): string =>
	s
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[\u0300-\u036F]/g, '')

export const search = (base: unknown, term: unknown): boolean => {
	const baseString = toString(base)
	const termString = toString(term)
	if (!baseString || !termString) return false
	return normalize(baseString).includes(normalize(termString))
}

export const includes = (
	a: string | string[],
	b: string | string[]
): boolean => {
	if (nil(a) || nil(b)) return false
	if (typeof a === 'string' && typeof b === 'string') {
		return normalize(a) === normalize(b)
	} else if (typeof a === 'string') {
		return (b as string[]).map(normalize).includes(normalize(a))
	} else if (typeof b === 'string') {
		return (a as string[]).map(normalize).includes(normalize(b))
	} else {
		return intersection(a.map(normalize), b.map(normalize)).length > 0
	}
}
