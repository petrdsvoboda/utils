import { compare } from '../string'

describe('compare', () => {
	test('it should compare strings', () => {
		expect(compare('a', 'b')).toEqual(-1)
		expect(compare('b', 'a')).toEqual(1)
		expect(compare('a', 'a')).toEqual(0)
	})
})
