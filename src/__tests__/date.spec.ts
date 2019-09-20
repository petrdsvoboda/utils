import { compare } from '../date'

describe('compare', () => {
	test('it should compare dates', () => {
		const date1 = new Date()
		const date2 = new Date(date1.getTime() + 60000)

		expect(compare(date1, date2)).toEqual(-1)
		expect(compare(date2, date1)).toEqual(1)
		expect(compare(date1, date1)).toEqual(0)
	})
})
