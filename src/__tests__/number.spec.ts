import { compare } from '../number'

describe('compare', () => {
	test('it should compare numbers', () => {
		expect(compare(1, 2)).toEqual(-1)
		expect(compare(2, 1)).toEqual(1)
		expect(compare(1, 1)).toEqual(0)
	})
})
