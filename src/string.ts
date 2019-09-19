import { CompareFn, CompareResult } from './types'

export const compare: CompareFn<string> = (a, b) =>
	a.localeCompare(b) as CompareResult
