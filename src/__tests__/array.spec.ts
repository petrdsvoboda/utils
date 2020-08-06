import * as array from '../array'
import * as record from '../record'

describe('sort', () => {
	test('it should perform sort', () => {
		const input = [{ a: 2 }, { a: 1 }]
		const output = [{ a: 1 }, { a: 2 }]

		expect(array.sort('a')(input)).toEqual(output)
	})

	test('it should perform sort on 5 object levels', () => {
		const input1 = [{ a: 2 }, { a: 1 }]
		const output1 = [{ a: 1 }, { a: 2 }]

		const input2 = [{ a: { b: 2 } }, { a: { b: 1 } }]
		const output2 = [{ a: { b: 1 } }, { a: { b: 2 } }]

		const input3 = [{ a: { b: { c: 2 } } }, { a: { b: { c: 1 } } }]
		const output3 = [{ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } }]

		const input4 = [
			{ a: { b: { c: { d: 2 } } } },
			{ a: { b: { c: { d: 1 } } } }
		]
		const output4 = [
			{ a: { b: { c: { d: 1 } } } },
			{ a: { b: { c: { d: 2 } } } }
		]

		const input5 = [
			{ a: { b: { c: { d: { e: 2 } } } } },
			{ a: { b: { c: { d: { e: 1 } } } } }
		]
		const output5 = [
			{ a: { b: { c: { d: { e: 1 } } } } },
			{ a: { b: { c: { d: { e: 2 } } } } }
		]

		expect(array.sort('a')(input1)).toEqual(output1)
		expect(record.update('a')(arr => arr.sort('b'))(input2)).toEqual(
			output2
		)
		expect(record.update('a', 'b')(arr => arr.sort('c'))(input3)).toEqual(
			output3
		)
		expect(
			record.update('a', 'b', 'c')(arr => arr.sort('d'))(input4)
		).toEqual(output4)
		expect(
			record.update('a', 'b', 'c', 'd')(arr => arr.sort('e'))(input5)
		).toEqual(output5)
	})

	test('it should perform sort with strings', () => {
		const input = [{ a: 'b' }, { a: 'a' }]
		const output = [{ a: 'a' }, { a: 'b' }]

		expect(array.sort('a')(input)).toEqual(output)
	})

	test('it should perform sort with dates', () => {
		const date1 = new Date()
		const date2 = new Date(date1.getTime() + 60000)

		const input = [{ a: date2 }, { a: date1 }]
		const output = [{ a: date1 }, { a: date2 }]

		expect(array.sort('a', { isDate: true })(input)).toEqual(output)
	})

	test('it should perform descending sort', () => {
		const input = [{ a: 2 }, { a: 1 }]
		const output = [{ a: 2 }, { a: 1 }]

		expect(array.sort('a', { ascending: false })(input)).toEqual(output)
	})

	test('it should handle undefined values', () => {
		const input = [{ a: undefined }, { a: 1 }]
		const output = [{ a: 1 }, { a: undefined }]

		expect(array.sort('a')(input)).toEqual(output)
	})

	test('it should handle nested undefined values', () => {
		type Values = {
			a?: { b: number }
		}
		const input: Values[] = [{ a: undefined }, { a: { b: 1 } }]
		const output: Values[] = [{ a: { b: 1 } }, { a: undefined }]

		type Values2 = {
			a?: { b?: { c: number } }
		}
		const input2: Values2[] = [
			{ a: undefined },
			{ a: { b: { c: 2 } } },
			{ a: { b: undefined } },
			{ a: { b: { c: 1 } } }
		]
		const output2: Values2[] = [
			{ a: { b: { c: 1 } } },
			{ a: { b: { c: 2 } } },
			{ a: undefined },
			{ a: { b: undefined } }
		]

		expect(record.update('a')(arr => arr.sort('b'))(input)).toEqual(output)
		expect(record.update('a', 'b')(arr => arr.sort('c'))(input2)).toEqual(
			output2
		)
	})

	test('it should handle null values', () => {
		const input = [{ a: null }, { a: 1 }]
		const output = [{ a: 1 }, { a: null }]

		expect(array.sort('a')(input)).toEqual(output)
	})

	test('it should handle nested null values', () => {
		type Values = {
			a?: { b: number } | null
		}
		const input: Values[] = [{ a: null }, { a: { b: 1 } }]
		const output: Values[] = [{ a: { b: 1 } }, { a: null }]

		type Values2 = {
			a?: { b?: { c: number } | null } | null
		}
		const input2: Values2[] = [
			{ a: null },
			{ a: { b: { c: 2 } } },
			{ a: { b: null } },
			{ a: { b: { c: 1 } } }
		]
		const output2: Values2[] = [
			{ a: { b: { c: 1 } } },
			{ a: { b: { c: 2 } } },
			{ a: null },
			{ a: { b: null } }
		]

		expect(record.update('a')(arr => arr.sort('b'))(input)).toEqual(output)
		expect(record.update('a', 'b')(arr => arr.sort('c'))(input2)).toEqual(
			output2
		)
	})
})

describe('merge', () => {
	test('it should merge arrays', () => {
		const input1 = [1, 2, 1]
		const input2 = [1, 2, 1]
		const output = [1, 2, 1, 1, 2, 1]

		expect(array.merge(input1, input2)).toEqual(output)
	})

	test('it should merge arrays, keeping only unique values', () => {
		const input1 = [1, 2, 1, 4]
		const input2 = [1, 2, 1, 3]
		const output = [1, 2, 4, 3]

		expect(array.merge(input1, input2, { unique: true })).toEqual(output)
	})

	test('it should merge arrays, keeping only common values', () => {
		const input1 = [1, 2, 1, 4]
		const input2 = [1, 2, 1, 3]
		const output = [1, 2]

		expect(array.merge(input1, input2, { common: true })).toEqual(output)
	})
})
