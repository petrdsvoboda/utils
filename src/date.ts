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
