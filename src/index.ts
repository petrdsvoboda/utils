export * as array from './array'
export * as base from './base'
export * as date from './date'
export * as number from './number'
export * as record from './record'
export * as string from './string'
export * as types from './types'

import * as record from './record'

const test = { a: { b: 3 } }
record.set('s', 'c')(4)(test)
