import * as Arr from '../array'

describe('get', () => {
	test('it handles basic get', () => {
		const input = [1, 2]

		expect(Arr.get(1)(input)).toEqual(2)
	})

	test('it handles undefined array', () => {
		const input = undefined
		expect(Arr.get(2)(input)).toEqual(undefined)
		expect(Arr.get(2, 3)(input)).toEqual(undefined)
	})

	test('it handles undefined index', () => {
		const input = [1, 2]

		expect(Arr.get(2)(input)).toEqual(undefined)
	})

	test('it handles deep get', () => {
		const input = [[1, 2], [2]]

		expect(Arr.get(0, 1)(input)).toEqual(2)
	})
})

describe('set', () => {
	test('it handles basic set', () => {
		const input = [1, 2]

		expect(Arr.set(1)(3)(input)).toEqual([1, 3])
		expect(Arr.set(2)(3)(input)).toEqual([1, 2, 3])
	})

	test('it handles undefined array', () => {
		const input = undefined
		expect(Arr.set(2)(3)(input)).toEqual(undefined)
		expect(Arr.set(2, 3)(3)(input)).toEqual(undefined)
	})

	test('it handles undefined index', () => {
		const input = [[1, 2], undefined]
		expect(Arr.set(1, 3)(3)(input as any)).toEqual([[1, 2], []])
	})

	test('it handles deep set', () => {
		const input = [[1, 2], [2]]

		expect(Arr.set(0, 1)(3)(input)).toEqual([[1, 3], [2]])
	})
})

describe('update', () => {
	test('it handles basic update', () => {
		const input = [1, 2]

		expect(Arr.update(1)(v => v + 1)(input)).toEqual([1, 3])
	})

	test('it handles undefined array', () => {
		const input = undefined
		expect(Arr.update(2)(v => v + 1)(input)).toEqual(undefined)
		expect(Arr.update(2, 3)(v => v + 1)(input)).toEqual(undefined)
	})

	test('it handles undefined index', () => {
		const input = [1, 2]
		expect(Arr.update(2)(v => v + 1)(input)).toEqual([1, 2])

		const input2 = [[1, 2], undefined]
		expect(Arr.update(1, 3)(v => v + 1)(input2 as any)).toEqual([
			[1, 2],
			[]
		])
	})

	test('it handles deep update', () => {
		const input = [[1, 2], [2]]

		expect(Arr.update(0, 1)(v => v + 1)(input)).toEqual([[1, 3], [2]])
	})
})

describe('sort', () => {
	test('it should perform sort', () => {
		const input = [{ a: 2 }, { a: 1 }]
		const output = [{ a: 1 }, { a: 2 }]

		expect(Arr.sort(input, {}, 'a')).toEqual(output)
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

		expect(Arr.sort(input1, {}, 'a')).toEqual(output1)
		expect(Arr.sort(input2, {}, 'a', 'b')).toEqual(output2)
		expect(Arr.sort(input3, {}, 'a', 'b', 'c')).toEqual(output3)
		expect(Arr.sort(input4, {}, 'a', 'b', 'c', 'd')).toEqual(output4)
		expect(Arr.sort(input5, {}, 'a', 'b', 'c', 'd', 'e')).toEqual(output5)
	})

	test('it should perform sort with strings', () => {
		const input = [{ a: 'b' }, { a: 'a' }]
		const output = [{ a: 'a' }, { a: 'b' }]

		expect(Arr.sort(input, {}, 'a')).toEqual(output)
	})

	test('it should perform sort with dates', () => {
		const date1 = new Date()
		const date2 = new Date(date1.getTime() + 60000)

		const input = [{ a: date2 }, { a: date1 }]
		const output = [{ a: date1 }, { a: date2 }]

		expect(Arr.sort(input, { isDate: true }, 'a')).toEqual(output)
	})

	test('it should perform descending sort', () => {
		const input = [{ a: 2 }, { a: 1 }]
		const output = [{ a: 2 }, { a: 1 }]

		expect(Arr.sort(input, { ascending: false }, 'a')).toEqual(output)
	})

	test('it should handle undefined values', () => {
		const input = [{ a: undefined }, { a: 1 }]
		const output = [{ a: 1 }, { a: undefined }]

		expect(Arr.sort(input, {}, 'a')).toEqual(output)
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

		expect(Arr.sort(input, {}, 'a', 'b')).toEqual(output)
		expect(Arr.sort(input2, {}, 'a', 'b', 'c')).toEqual(output2)
	})

	test('it should handle null values', () => {
		const input = [{ a: null }, { a: 1 }]
		const output = [{ a: 1 }, { a: null }]

		expect(Arr.sort(input, {}, 'a')).toEqual(output)
	})

	test('it should handle nested null values', () => {
		type Values = {
			a?: { b: number  } | null
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

		expect(Arr.sort(input, {}, 'a', 'b')).toEqual(output)
		expect(Arr.sort(input2, {}, 'a', 'b', 'c')).toEqual(output2)
	})
})

describe('merge', () => {
	test('it should merge arrays', () => {
		const input1 = [1, 2, 1]
		const input2 = [1, 2, 1]
		const output = [1, 2, 1, 1, 2, 1]

		expect(Arr.merge(input1, input2)).toEqual(output)
	})

	test('it should merge arrays, keeping only unique values', () => {
		const input1 = [1, 2, 1, 4]
		const input2 = [1, 2, 1, 3]
		const output = [1, 2, 4, 3]

		expect(Arr.merge(input1, input2, { unique: true })).toEqual(output)
	})
})
