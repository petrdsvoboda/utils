import {
	capitalize,
	compare,
	includes,
	search,
	splitCapitalize,
	splitPath,
	toString
} from '../string'

describe('compare', () => {
	test('it should compare strings', () => {
		expect(compare('a', 'b')).toEqual(-1)
		expect(compare('b', 'a')).toEqual(1)
		expect(compare('a', 'a')).toEqual(0)
	})
})

describe('capitalize', () => {
	test('it should capitalize', () => {
		expect(capitalize('test')).toEqual('Test')
		expect(capitalize('test test')).toEqual('Test test')
		expect(capitalize('testtest')).toEqual('Testtest')
		expect(capitalize('')).toEqual('')
	})
})

describe('splitCapitalize', () => {
	test('it should capitalize', () => {
		expect(splitCapitalize('test')).toEqual('Test')
		expect(splitCapitalize('test test')).toEqual('Test test')
		expect(splitCapitalize('testtest')).toEqual('Testtest')
		expect(splitCapitalize('testTest')).toEqual('Test Test')
		expect(splitCapitalize('')).toEqual('')
	})
})

describe('splitPath', () => {
	test('it should split', () => {
		expect(splitPath(undefined as any)).toEqual([])
		expect(splitPath('')).toEqual([''])
		expect(splitPath('test')).toEqual(['test'])
		expect(splitPath('test.test')).toEqual(['test', 'test.test'])
	})
})

describe('toString', () => {
	test('it should convert', () => {
		expect(toString('test')).toEqual('test')
		expect(toString(1)).toEqual('1')
		expect(toString(new Date('2020-01-01'))).toEqual('1. 1. 2020 1:00:00')
		expect(toString(true)).toEqual(undefined)
		expect(toString(undefined)).toEqual(undefined)
		expect(toString(null)).toEqual(undefined)
	})
})

describe('search', () => {
	test('it should search', () => {
		expect(search('test', 'test')).toEqual(true)
		expect(search(undefined, 'test')).toEqual(false)
		expect(search('test', undefined)).toEqual(false)
		expect(search('test', 't')).toEqual(true)
	})
})

describe('includes', () => {
	test('it should search', () => {
		expect(includes('test', 'test')).toEqual(true)

		expect(includes('test', ['test'])).toEqual(true)
		expect(includes(['test'], 'test')).toEqual(true)
		expect(includes(['test'], ['test'])).toEqual(true)

		expect(includes(['test', 'no'], ['test'])).toEqual(true)
		expect(includes(['test'], ['test', 'no'])).toEqual(true)
		expect(includes(['test', 'no'], ['test', 'no'])).toEqual(true)

		expect(includes('no', 'test')).toEqual(false)
		expect(includes(['no', 'no2'], 'test')).toEqual(false)
		expect(includes('no', ['test', 'test2'])).toEqual(false)
		expect(includes(['no'], ['test', 'test2'])).toEqual(false)

		expect(includes(['no', 'te'], 'te')).toEqual(true)

		expect(includes(undefined as any, 'te')).toEqual(false)
		expect(includes('te', undefined as any)).toEqual(false)
	})
})
