import { sort, merge } from '../array'

describe('sort', () => {
	test('it should perform sort', () => {
		const input = [{ a: 2 }, { a: 1 }]
		const output = [{ a: 1 }, { a: 2 }]

		expect(sort(input, {}, 'a')).toEqual(output)
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

		expect(sort(input1, {}, 'a')).toEqual(output1)
		expect(sort(input2, {}, 'a', 'b')).toEqual(output2)
		expect(sort(input3, {}, 'a', 'b', 'c')).toEqual(output3)
		expect(sort(input4, {}, 'a', 'b', 'c', 'd')).toEqual(output4)
		expect(sort(input5, {}, 'a', 'b', 'c', 'd', 'e')).toEqual(output5)
	})

	test('it should perform sort with strings', () => {
		const input = [{ a: 'b' }, { a: 'a' }]
		const output = [{ a: 'a' }, { a: 'b' }]

		expect(sort(input, {}, 'a')).toEqual(output)
	})

	test('it should perform sort with dates', () => {
		const date1 = new Date()
		const date2 = new Date(date1.getTime() + 60000)

		const input = [{ a: date2 }, { a: date1 }]
		const output = [{ a: date1 }, { a: date2 }]

		expect(sort(input, { isDate: true }, 'a')).toEqual(output)
	})

	test('it should perform descending sort', () => {
		const input = [{ a: 2 }, { a: 1 }]
		const output = [{ a: 2 }, { a: 1 }]

		expect(sort(input, { ascending: false }, 'a')).toEqual(output)
	})

	test('it should handle undefined values', () => {
		const input = [{ a: undefined }, { a: 1 }]
		const output = [{ a: 1 }, { a: undefined }]

		expect(sort(input, {}, 'a')).toEqual(output)
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

		expect(sort(input, {}, 'a', 'b')).toEqual(output)
		expect(sort(input2, {}, 'a', 'b', 'c')).toEqual(output2)
	})
})

describe('merge', () => {
	test('it should merge arrays', () => {
		const input1 = [1, 2, 1]
		const input2 = [1, 2, 1]
		const output = [1, 2, 1, 1, 2, 1]

		expect(merge(input1, input2)).toEqual(output)
	})

	test('it should merge arrays, keeping only unique values', () => {
		const input1 = [1, 2, 1, 4]
		const input2 = [1, 2, 1, 3]
		const output = [1, 2, 4, 3]

		expect(merge(input1, input2, { unique: true })).toEqual(output)
	})
})
