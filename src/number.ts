import { CompareFn } from './types'

export const compare: CompareFn<number> = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
