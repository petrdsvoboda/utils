import {
	compare,
	formatDate,
	toDate,
	toLocalDate,
	toLocalDateTime,
	toLocalTime
} from '../date'

describe('compare', () => {
	test('it should check undefined or values', () => {
		const d1 = new Date('2020-01-01')
		const d2 = new Date('2020-01-02')
		expect(compare(d2, d1)).toEqual(1)
		expect(compare(d1, d1)).toEqual(0)
	})
})

describe('toDate', () => {
	test('it should convert to Date', () => {
		expect(toDate('2020-01-01')).toEqual(new Date('2020-01-01'))
	})

	test('it should not convert Date', () => {
		const d = new Date('2020-01-01')
		expect(toDate(d)).toEqual(d)
	})
})

describe('formatDate', () => {
	test('it should format', () => {
		expect(formatDate(new Date('2020-01-01'))).toEqual('2020-01-01')
		expect(formatDate(new Date('2020-10-01'))).toEqual('2020-10-01')
		expect(formatDate(new Date('2020-01-10'))).toEqual('2020-01-10')
	})

	test('it should format no arg', () => {
		const mockDate = new Date('2020-01-01')
		const spy = jest
			.spyOn(global, 'Date')
			.mockImplementation(() => mockDate as any)

		expect(formatDate()).toEqual('2020-01-01')
		spy.mockRestore()
	})
})

describe('toLocalDateTime', () => {
	test('it should format', () => {
		expect(toLocalDateTime(new Date('2020-01-01'))).toEqual(
			'1. 1. 2020 1:00:00'
		)
	})

	test('it should handle nullable', () => {
		expect(toLocalDateTime()).toEqual(null)
		expect(toLocalDateTime(undefined)).toEqual(null)
		expect(toLocalDateTime(null)).toEqual(null)
	})
})

describe('toLocalDate', () => {
	test('it should format', () => {
		expect(toLocalDate(new Date('2020-01-01'))).toEqual('1. 1. 2020')
	})

	test('it should handle nullable', () => {
		expect(toLocalDate()).toEqual(null)
		expect(toLocalDate(undefined)).toEqual(null)
		expect(toLocalDate(null)).toEqual(null)
	})
})

describe('toLocalTime', () => {
	test('it should format', () => {
		expect(toLocalTime(new Date('2020-01-01'))).toEqual('1:00:00')
	})

	test('it should handle nullable', () => {
		expect(toLocalTime()).toEqual(null)
		expect(toLocalTime(undefined)).toEqual(null)
		expect(toLocalTime(null)).toEqual(null)
	})
})
