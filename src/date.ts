import { nil } from './base'
import { CompareFn } from './types'

export const compare: CompareFn<Date> = (a, b) => (a < b ? -1 : a > b ? 1 : 0)

export const formatDate = (date: Date = new Date()): string => {
	const d = new Date(date)
	let month = '' + (d.getMonth() + 1)
	let day = '' + d.getDate()
	const year = d.getFullYear()

	if (month.length < 2) month = '0' + month
	if (day.length < 2) day = '0' + day

	return [year, month, day].join('-')
}

export const toLocalDateTime = (
	value?: string | Date | null
): string | null => {
	if (nil(value)) return null
	return new Date(value).toLocaleString('cs')
}

export const toLocalDate = (value?: string | Date | null): string | null => {
	if (nil(value)) return null
	return new Date(value).toLocaleDateString('cs')
}

export const toLocalTime = (value?: string | Date | null): string | null => {
	if (nil(value)) return null
	return new Date(value).toLocaleTimeString('cs')
}
