import { CompareFn } from './types'

export const compare: CompareFn<number> = (a, b) => (a < b ? -1 : a > b ? 1 : 0)

export const round = (val: number, precision?: number): number => {
	const order = Math.pow(10, precision ?? 0)
	return Math.round(val * order) / order
}
