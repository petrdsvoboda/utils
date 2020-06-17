import { nil, notNil } from '../base'

describe('nil', () => {
	test('it should check undefined or values', () => {
		expect(nil(1)).toEqual(false)
		expect(nil(undefined)).toEqual(true)
		expect(nil(null)).toEqual(true)
	})
})

describe('notNil', () => {
	test('it should check undefined or values', () => {
		expect(notNil(1)).toEqual(true)
		expect(notNil(undefined)).toEqual(false)
		expect(notNil(null)).toEqual(false)
	})
})
