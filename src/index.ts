export * as array from './array'
export * as base from './base'
export * as date from './date'
export * as number from './number'
export * as record from './record'
export * as string from './string'
export * as types from './types'

const lens = <T extends Record<string, any>, TKey extends keyof T>(
	key: TKey
) => {
	return (record: T) => (value: T[keyof T]): T => {
		record[key] = value
		return record
	}
}

type Nested<T extends Record<string, any>> = T[]

type Rec = Record<string, any>
type Lens<
	T extends Rec,
	X extends unknown[] = Lens2<T[keyof T]>
> = T[keyof T] extends null ? [] : [keyof T, ...X[]]
type Lens2<T extends Rec> = [keyof T]

const obj = {
	foo: 1,
	bar: {
		barz: 2,
		barzz: 3
	}
}

const x: Lens<typeof obj> = ['bar', 'ff']

const l = lens('bar')
const res = l(obj)(23)
