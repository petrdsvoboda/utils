import { CompareFn } from './types'

export const compare: CompareFn<Date> = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
