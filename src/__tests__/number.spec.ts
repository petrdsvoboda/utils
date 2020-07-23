import { compare, round } from '../number'

describe('compare', () => {
	test('it should compare numbers', () => {
		expect(compare(1, 2)).toEqual(-1)
		expect(compare(2, 1)).toEqual(1)
		expect(compare(1, 1)).toEqual(0)
	})
})

describe('round', () => {
	test('it round without precision set', () => {
		expect(round(2.341)).toEqual(2)
		expect(round(2.741)).toEqual(3)
		expect(round(-2.341)).toEqual(-2)
	})
	test('it round with precision', () => {
		expect(round(2.341, 0)).toEqual(2)
		expect(round(2.341, 1)).toEqual(2.3)
		expect(round(2.341, 2)).toEqual(2.34)
		expect(round(2.741, 0)).toEqual(3)
		expect(round(2.741, 1)).toEqual(2.7)
		expect(round(2.741, 2)).toEqual(2.74)
		expect(round(-2.361, 0)).toEqual(-2)
		expect(round(-2.361, 1)).toEqual(-2.4)
		expect(round(-2.361, 2)).toEqual(-2.36)
	})
})
