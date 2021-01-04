import { compare, random, round } from '../number'

describe('compare', () => {
	test('it should compare numbers', () => {
		expect(compare(1, 2)).toEqual(-1)
		expect(compare(2, 1)).toEqual(1)
		expect(compare(1, 1)).toEqual(0)
	})
})

describe('round', () => {
	test('it rounds without precision set', () => {
		expect(round(2.341)).toEqual(2)
		expect(round(2.741)).toEqual(3)
		expect(round(-2.341)).toEqual(-2)
	})
	test('it rounds with precision', () => {
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

describe('random', () => {
	beforeEach(() => {
		jest.spyOn(global.Math, 'random').mockReturnValue(0.2)
	})

	afterEach(() => {
		jest.spyOn(global.Math, 'random').mockRestore()
	})

	test('it generates random num', () => {
		expect(random(10)).toEqual(2)
		expect(random(5)).toEqual(1)
		expect(random(1234)).toEqual(247)
	})
	test('it rounds with precision', () => {
		expect(random(10, 5)).toEqual(6)
		expect(random(5, 0)).toEqual(1)
		expect(random(1234, -200)).toEqual(87)
	})
})
