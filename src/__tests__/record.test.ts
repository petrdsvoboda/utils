import * as record from '../record'

describe('set', () => {
	test('it should set value in object', () => {
		const input = { a: 1, b: 2 }
		const output = { a: 3, b: 2 }

		expect(record.set(input, ['a'], 3)).toEqual(output)
	})

	test('it should set value in object on 5 levels', () => {
		const lvl6 = 6
		const lvl5 = { '5': lvl6 }
		const lvl4 = { '4': lvl5 }
		const lvl3 = { '3': lvl4 }
		const lvl2 = { '2': lvl3 }
		const lvl1 = { '1': lvl2 }

		const output = { 1: { '2': { '3': { '4': { '5': 7 } } } } }

		expect(
			record.set(lvl1, ['1'], { '2': { '3': { '4': { '5': 7 } } } })
		).toEqual(output)
		expect(
			record.set(lvl1, ['1', '2'], { '3': { '4': { '5': 7 } } })
		).toEqual(output)
		expect(record.set(lvl1, ['1', '2', '3'], { '4': { '5': 7 } })).toEqual(
			output
		)
		expect(record.set(lvl1, ['1', '2', '3', '4'], { '5': 7 })).toEqual(
			output
		)
		expect(record.set(lvl1, ['1', '2', '3', '4', '5'], 7)).toEqual(output)
	})

	test('it should handle undefined', () => {
		expect(record.set(undefined as any, ['a'] as any, 3)).toEqual({ a: 3 })
	})

	test('it should handle null', () => {
		expect(record.set(null as any, ['a'] as any, 3)).toEqual({ a: 3 })
	})

	test('it should handle possible undefined branches', () => {
		type TestO = {
			a?: { [key: string]: string }
		}
		const input: TestO = { a: { b: '1' } }
		const output: TestO = { a: { b: '2' } }
		expect(record.set(input as any, ['a', 'b'] as any, '2')).toEqual(output)
	})
})

describe('update', () => {
	test('it should update value in object', () => {
		const input = { a: 1, b: 2 }
		const output = { a: 2, b: 2 }

		expect(record.update(input, ['a'], v => v + 1)).toEqual(output)
	})

	test('it should update value in object on 5 levels', () => {
		const lvl6 = 6
		const lvl5 = { '5': lvl6 }
		const lvl4 = { '4': lvl5 }
		const lvl3 = { '3': lvl4 }
		const lvl2 = { '2': lvl3 }
		const lvl1 = { '1': lvl2 }

		const output = { 1: { '2': { '3': { '4': { '5': 7 } } } } }

		expect(
			record.update(lvl1, ['1'] as ['1'], v => ({
				...v,
				'2': { '3': { '4': { '5': v[2][3][4][5] + 1 } } }
			}))
		).toEqual(output)
		expect(
			record.update(lvl1, ['1', '2'] as ['1', '2'], v => ({
				...v,
				'3': { '4': { '5': v[3][4][5] + 1 } }
			}))
		).toEqual(output)
		expect(
			record.update(lvl1, ['1', '2', '3'] as ['1', '2', '3'], v => ({
				...v,
				'4': { '5': v[4][5] + 1 }
			}))
		).toEqual(output)
		expect(
			record.update(
				lvl1,
				['1', '2', '3', '4'] as ['1', '2', '3', '4'],
				v => ({
					...v,
					'5': v[5] + 1
				})
			)
		).toEqual(output)
		expect(
			record.update(
				lvl1,
				['1', '2', '3', '4', '5'] as ['1', '2', '3', '4', '5'],
				v => v + 1
			)
		).toEqual(output)
	})

	test('it should handle undefined', () => {
		const a = { '1': undefined }
		const b = { '1': { '2': undefined } }
		const c = { '1': { '2': { '3': undefined } } }

		expect(record.update(undefined as any, ['1'] as any, v => v)).toEqual({
			1: undefined
		})
		expect(record.update(a as any, ['1'] as any, v => v)).toEqual({
			1: undefined
		})
		expect(record.update(b as any, ['1', '2'] as any, v => v)).toEqual({
			1: { 2: undefined }
		})
		expect(
			record.update(c as any, ['1', '2', '3'] as any, v => v)
		).toEqual({ 1: { 2: { 3: undefined } } })
	})

	test('it should handle null', () => {
		const a = { '1': null as any }
		const b = { '1': { '2': null as any } }
		const c = { '1': { '2': { '3': null as any } } }

		expect(record.update(null as any, ['1'] as any, v => v)).toEqual({
			1: undefined
		})
		expect(record.update(a as any, ['1'] as any, v => v)).toEqual({
			1: null
		})
		expect(record.update(b as any, ['1', '2'] as any, v => v)).toEqual({
			1: { 2: null }
		})
		expect(
			record.update(c as any, ['1', '2', '3'] as any, v => v)
		).toEqual({ 1: { 2: { 3: null } } })
	})

	test('it should handle possible undefined branches', () => {
		type TestO = {
			a?: { [key: string]: number }
		}
		const input: TestO = { a: { a: 1 } }
		expect(
			record.update(input, ['a', 'b'] as any, value => value + 1)
		).toEqual({ a: { a: 1, b: NaN } })
	})
})

describe('toArray', () => {
	test('it should convert map to array', () => {
		const input = { a: 1, b: 2 }
		const output = [1, 2]

		expect(record.toArray(input)).toEqual(output)
	})
})

describe('merge', () => {
	test('it should merge objects', () => {
		const a = { a: 1, b: 2, c: 3 }
		const b = { a: 3, b: 4, d: 5 }
		const output = { a: 3, b: 4, c: 3, d: 5 }

		expect(record.merge(a, b)).toEqual(output)
	})

	test('it should deep merge objects', () => {
		const a = { a: { aa: 1, bb: 2 }, b: 2, c: 3 }
		const b = { a: { aa: 2, cc: 3 }, b: { dd: 4 }, d: 5 }
		const output = { a: { aa: 2, bb: 2, cc: 3 }, b: { dd: 4 }, c: 3, d: 5 }

		expect(record.merge(a, b)).toEqual(output)
	})

	test('it should deep merge arrays', () => {
		const a = { a: [1, 2], b: 2, c: 3 }
		const b = { a: [1, 3], b: [4, 5], d: 5 }
		const output = { a: [1, 2, 1, 3], b: [4, 5], c: 3, d: 5 }

		expect(record.merge(a, b)).toEqual(output)
	})

	test('it should handle undefined', () => {
		const a = { a: 1 }

		expect(record.merge(undefined, a)).toEqual(a)
		expect(record.merge(a, undefined)).toEqual(a)
		expect(record.merge(undefined, undefined)).toEqual(undefined)
	})
})

describe('map', () => {
	test('it should map over object', () => {
		const input = { a: 1, b: 2 }
		const output1 = { a: 2, b: 3 }
		const output2 = { a: '1', b: '2' }

		expect(record.map(input, v => v + 1)).toEqual(output1)
		expect(record.map(input, v => v.toString())).toEqual(output2)
	})
})

describe('reduce', () => {
	test('it should reduce over object', () => {
		const input = { a: 1, b: 2 }
		const output = 3

		expect(record.reduce(input, (acc, curr) => acc + curr, 0)).toEqual(
			output
		)
	})
})
