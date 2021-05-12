import { compare, CompareData, compareMerge } from '../compare'

describe('compare', () => {
	it('handles strings', () => {
		const schema = { foo: 'string', foo2: 'string' } as const
		const a = { foo: 'bar' }
		const b = { foo: 'baz' }
		const c = { foo: 'bar', foo2: 'baz' }

		expect(compare(schema, a, a)).toEqual({
			version: 2,
			schema,
			data: {}
		})

		expect(compare(schema, a, b)).toEqual({
			version: 2,
			schema,
			data: {
				foo: ['modified', ['bar', 'baz']]
			}
		})

		expect(compare(schema, a, c)).toEqual({
			version: 2,
			schema,
			data: {
				foo2: ['added', 'baz']
			}
		})

		expect(compare(schema, c, a)).toEqual({
			version: 2,
			schema,
			data: {
				foo2: ['removed', 'baz']
			}
		})
	})

	it('handles numbers', () => {
		const schema = { foo: 'number', foo2: 'number' } as const
		const a = { foo: 1 }
		const b = { foo: 2 }
		const c = { foo: 1, foo2: 2 }

		expect(compare(schema, a, a)).toEqual({
			version: 2,
			schema,
			data: {}
		})

		expect(compare(schema, a, b)).toEqual({
			version: 2,
			schema,
			data: {
				foo: ['modified', [1, 2]]
			}
		})

		expect(compare(schema, a, c)).toEqual({
			version: 2,
			schema,
			data: {
				foo2: ['added', 2]
			}
		})

		expect(compare(schema, c, a)).toEqual({
			version: 2,
			schema,
			data: {
				foo2: ['removed', 2]
			}
		})
	})

	it('handles booleans', () => {
		const schema = { foo: 'boolean', foo2: 'boolean' } as const
		const a = { foo: true }
		const b = { foo: false }
		const c = { foo: true, foo2: false }

		expect(compare(schema, a, a)).toEqual({
			version: 2,
			schema,
			data: {}
		})

		expect(compare(schema, a, b)).toEqual({
			version: 2,
			schema,
			data: {
				foo: ['modified', [true, false]]
			}
		})

		expect(compare(schema, a, c)).toEqual({
			version: 2,
			schema,
			data: {
				foo2: ['added', false]
			}
		})

		expect(compare(schema, c, a)).toEqual({
			version: 2,
			schema,
			data: {
				foo2: ['removed', false]
			}
		})
	})

	it('handles dates', () => {
		const schema = { foo: 'boolean', foo2: 'boolean' } as const
		const d1 = new Date('2021-05-05')
		const d2 = new Date('2021-06-05')
		const a = { foo: d1 }
		const b = { foo: d2 }
		const c = { foo: d1, foo2: d2 }

		expect(compare(schema, a, a)).toEqual({
			version: 2,
			schema,
			data: {}
		})

		expect(compare(schema, a, b)).toEqual({
			version: 2,
			schema,
			data: {
				foo: ['modified', [d1, d2]]
			}
		})

		expect(compare(schema, a, c)).toEqual({
			version: 2,
			schema,
			data: {
				foo2: ['added', d2]
			}
		})

		expect(compare(schema, c, a)).toEqual({
			version: 2,
			schema,
			data: {
				foo2: ['removed', d2]
			}
		})
	})

	it('handles objects', () => {
		const schema = {
			foo: ['object', { bar: 'number', baz: 'number' }]
		} as const
		const a = { foo: { bar: 1 } }
		const b = { foo: { bar: 2 } }
		const c = { foo: { bar: 1, baz: 2 } }
		const d = { foo: {} }
		const e = {}

		expect(compare(schema, a, a)).toEqual({
			version: 2,
			schema,
			data: {}
		})

		expect(compare(schema, a, b)).toEqual({
			version: 2,
			schema,
			data: {
				foo: { bar: ['modified', [1, 2]] }
			}
		})

		expect(compare(schema, a, c)).toEqual({
			version: 2,
			schema,
			data: {
				foo: { baz: ['added', 2] }
			}
		})

		expect(compare(schema, c, a)).toEqual({
			version: 2,
			schema,
			data: {
				foo: { baz: ['removed', 2] }
			}
		})

		expect(compare(schema, e, d)).toEqual({
			version: 2,
			schema,
			data: {
				foo: ['added', {}]
			}
		})

		expect(compare(schema, d, e)).toEqual({
			version: 2,
			schema,
			data: {
				foo: ['removed', {}]
			}
		})

		expect(compare(schema, e, a)).toEqual({
			version: 2,
			schema,
			data: {
				foo: ['added', { bar: 1 }]
			}
		})
	})

	it('handles arrays', () => {
		const schema = {
			foo: ['array', 'number']
		} as const
		const a = { foo: [1, 2] }
		const b = { foo: [2, 2] }
		const c = { foo: [1, 2, 3] }
		const d = { foo: [] }
		const e = {}

		expect(compare(schema, a, a)).toEqual({
			version: 2,
			schema,
			data: {}
		})

		expect(compare(schema, a, b)).toEqual({
			version: 2,
			schema,
			data: {
				foo: { 0: ['modified', [1, 2]] }
			}
		})

		expect(compare(schema, a, c)).toEqual({
			version: 2,
			schema,
			data: {
				foo: { 2: ['added', 3] }
			}
		})

		expect(compare(schema, c, a)).toEqual({
			version: 2,
			schema,
			data: {
				foo: { 2: ['removed', 3] }
			}
		})

		expect(compare(schema, e, d)).toEqual({
			version: 2,
			schema,
			data: {
				foo: ['added', []]
			}
		})

		expect(compare(schema, d, e)).toEqual({
			version: 2,
			schema,
			data: {
				foo: ['removed', []]
			}
		})

		expect(compare(schema, e, a)).toEqual({
			version: 2,
			schema,
			data: {
				foo: ['added', [1, 2]]
			}
		})
	})

	it('handles object arrays', () => {
		const schema = {
			foo: [
				'array',
				{
					bar: 'number',
					baz: 'string'
				}
			]
		} as const
		const a = { foo: [{ bar: 1 }, { bar: 1 }] }
		const b = { foo: [{ bar: 1 }, { bar: 2 }] }
		const c = { foo: [{ bar: 1 }, { bar: 1, baz: 'ok' }] }
		const d = { foo: [{ bar: 1 }] }
		const e = {}

		expect(compare(schema, a, a)).toEqual({
			version: 2,
			schema,
			data: {}
		})

		expect(compare(schema, a, b)).toEqual({
			version: 2,
			schema,
			data: {
				foo: { 1: { bar: ['modified', [1, 2]] } }
			}
		})

		expect(compare(schema, a, c)).toEqual({
			version: 2,
			schema,
			data: {
				foo: { 1: { baz: ['added', 'ok'] } }
			}
		})

		expect(compare(schema, c, a)).toEqual({
			version: 2,
			schema,
			data: {
				foo: { 1: { baz: ['removed', 'ok'] } }
			}
		})

		expect(compare(schema, e, d)).toEqual({
			version: 2,
			schema,
			data: {
				foo: ['added', [{ bar: 1 }]]
			}
		})

		expect(compare(schema, d, e)).toEqual({
			version: 2,
			schema,
			data: {
				foo: ['removed', [{ bar: 1 }]]
			}
		})

		expect(compare(schema, d, a)).toEqual({
			version: 2,
			schema,
			data: {
				foo: { 1: ['added', { bar: 1 }] }
			}
		})

		expect(compare(schema, a, d)).toEqual({
			version: 2,
			schema,
			data: {
				foo: { 1: ['removed', { bar: 1 }] }
			}
		})

		const schema2 = {
			foo: [
				'array',
				{
					bar: 'number',
					baz: 'string'
				},
				'bar'
			]
		} as const
		const f = {
			foo: [
				{ bar: 1, baz: 'ok' },
				{ bar: 2, baz: 'ok' }
			]
		}
		const g = {
			foo: [
				{ bar: 1, baz: 'ok' },
				{ bar: 2, baz: 'nok' }
			]
		}
		const h = { foo: [{ bar: 1, baz: 'ok' }, { bar: 2 }] }

		expect(compare(schema2, f, g)).toEqual({
			version: 2,
			schema: schema2,
			data: {
				foo: { 2: { baz: ['modified', ['ok', 'nok']] } }
			}
		})

		expect(compare(schema2, f, h)).toEqual({
			version: 2,
			schema: schema2,
			data: {
				foo: { 2: { baz: ['removed', 'ok'] } }
			}
		})

		expect(compare(schema2, h, f)).toEqual({
			version: 2,
			schema: schema2,
			data: {
				foo: { 2: { baz: ['added', 'ok'] } }
			}
		})
	})

	it('handles complex schema', () => {
		const schema = {
			a: 'string',
			b: 'number',
			c: 'boolean',
			d: 'date',
			e: [
				'object',
				{ ea: 'string', eb: 'number', ec: 'string', ed: 'string' }
			],
			f: ['array', 'string'],
			g: ['array', { id: 'number', ga: 'string', gb: 'number' }, 'id'],
			h: 'date'
		} as const
		const a = {
			b: 23,
			c: true,
			d: new Date('2021-05-01'),
			e: { ea: 'ok', eb: 3, ed: 'ok' },
			f: ['asd', 'asds', 'wer'],
			g: [
				{ id: 11, ga: '1', gb: 23 },
				{ id: 21, ga: '2' },
				{ id: 31, ga: '2', gb: 33 },
				{ id: 41, ga: '2', gb: 33 }
			],
			h: new Date('2021-05-01')
		}

		const b = {
			a: 'Testing2',
			c: false,
			d: new Date('2021-05-01'),
			e: { ea: 'ok', eb: 4, ec: 'ok' },
			f: ['asd', 'dsc'],
			g: [
				{ id: 11, ga: '12', gb: 23 },
				{ id: 21, ga: '2', gb: 13 },
				{ id: 31, ga: '3' },
				{ id: 51, ga: '2', gb: 33 }
			],
			h: new Date('2021-05-02')
		}

		expect(compare(schema, a, b)).toEqual({
			version: 2,
			schema,
			data: {
				a: ['added', 'Testing2'],
				b: ['removed', 23],
				c: ['modified', [true, false]],
				e: {
					eb: ['modified', [3, 4]],
					ec: ['added', 'ok'],
					ed: ['removed', 'ok']
				},
				f: {
					'1': ['modified', ['asds', 'dsc']],
					'2': ['removed', 'wer']
				},
				g: {
					'11': {
						ga: ['modified', ['1', '12']]
					},
					'21': {
						gb: ['added', 13]
					},
					'31': {
						ga: ['modified', ['2', '3']],
						gb: ['removed', 33]
					},
					'41': [
						'removed',
						{
							ga: '2',
							gb: 33,
							id: 41
						}
					],
					'51': [
						'added',
						{
							ga: '2',
							gb: 33,
							id: 51
						}
					]
				},
				h: [
					'modified',
					[new Date('2021-05-01'), new Date('2021-05-02')]
				]
			}
		})
	})
})

describe('mergeCompare', () => {
	it('handles strings', () => {
		const a: CompareData = {
			version: 2,
			schema: {},
			data: {
				a: ['added', 'Testing2'],
				c: ['modified', [true, false]],
				e: {
					ec: ['added', 'ok'],
					ed: ['removed', 'ok']
				},
				f: { '2': ['removed', 'wer'] }
			}
		}
		const b: CompareData = {
			version: 2,
			schema: {},
			data: {
				a: ['added', 'Testing2a'],
				b: ['removed', 23],
				e: {
					ec: ['added', 'ok'],
					ed: ['removed', 'ok']
				},
				f: { '2': ['removed', 'wer'] }
			}
		}
		const res: CompareData = {
			version: 2,
			schema: {},
			data: {
				a: ['added', 'Testing2a'],
				c: ['modified', [true, false]],
				e: { ec: ['added', 'ok'], ed: ['removed', 'ok'] },
				f: { '2': ['removed', 'wer'] },
				b: ['removed', 23]
			}
		}
		expect(compareMerge(a as any, b as any)).toStrictEqual(res)
	})
})
