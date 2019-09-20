import { notNil } from '../base'

describe('notNil', () => {
	test('it should check undefined or values', () => {
		expect(notNil(1)).toEqual(true)
		expect(notNil(undefined)).toEqual(false)
		expect(notNil(null)).toEqual(false)
	})
})
