export * as array from './array'
export * as base from './base'
export * as compare from './compare'
export * as date from './date'
export * as number from './number'
export * as record from './record'
export * as string from './string'
export * as types from './types'

import { compare, mergeCompare } from './compare'

const schema = {
	a: 'string',
	b: 'number',
	c: 'boolean',
	d: 'date',
	e: ['object', { ea: 'string', eb: 'number', ec: 'string', ed: 'string' }],
	f: ['array', 'string'],
	g: ['array', { id: 'number', ga: 'string', gb: 'number' }, 'id'],
	h: 'date'
} as const

const obj1 = {
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

const obj2 = {
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

const res = compare(schema, obj1, obj2)
const res2 = mergeCompare(
	{
		a: ['added', 'Testing2'],
		c: ['modified', [true, false]],
		e: {
			ec: ['added', 'ok'],
			ed: ['removed', 'ok']
		},
		f: { '2': ['removed', 'wer'] }
	},
	{
		a: ['added', 'Testing2a'],
		b: ['removed', 23],
		e: {
			ec: ['added', 'ok'],
			ed: ['removed', 'ok']
		},
		f: { '2': ['removed', 'wer'] }
	}
)
console.log(res2)
// console.log(JSON.stringify(res.result, null, 2))
