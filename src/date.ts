import { nil } from './base'
import { CompareFn } from './types'

type DateLike = Date | string | number

export const compare: CompareFn<Date> = (a, b) => (a < b ? -1 : a > b ? 1 : 0)

export const toDate = (value: DateLike): Date => {
	if (value instanceof Date) return value
	return new Date(value)
}

export const formatDate = (date: DateLike = new Date()): string => {
	const d = toDate(date)
	let month = '' + (d.getMonth() + 1)
	let day = '' + d.getDate()
	const year = d.getFullYear()
	if (month.length < 2) month = '0' + month
	if (day.length < 2) day = '0' + day
	return [year, month, day].join('-')
}

export const toLocalDateTime = (
	value?: DateLike | null | undefined
): string | null => {
	if (nil(value)) return null
	return toDate(value).toLocaleString('cs')
}

export const toLocalDate = (
	value?: DateLike | null | undefined
): string | null => {
	if (nil(value)) return null
	return toDate(value).toLocaleDateString('cs')
}

export const toLocalTime = (
	value?: DateLike | null | undefined
): string | null => {
	if (nil(value)) return null
	return toDate(value).toLocaleTimeString('cs')
}
