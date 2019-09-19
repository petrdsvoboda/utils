import { Map, update, get, set, toArray, merge } from './record'
import { sort } from './array'

let a: Record<'1' | '2' | '3', { test: string; another: number }> = {
	'1': { test: '111', another: 111 },
	'2': { test: '222', another: 222 },
	'3': { test: '333', another: 333 }
}

let c: Record<'1' | '4', { test: string; another: number }> = {
	'1': { test: '11111', another: 222 },
	'4': { test: '333', another: 333 }
}

console.log(get(a, '1', 'test'))

console.log(a)
a = set(a, '1', 'test')('xxx')
console.log(a)
a = update(a, '2')(x => ({
	...x,
	another: 333
}))
a = update(a, '3', 'another')(x => x + 1)
console.log(a)

let b = toArray(a)
console.log('')
console.log(b)
console.log('')
b = sort(b, {}, 'another')
console.log(b)
console.log('')
b = sort(b, { ascending: false }, 'another')
console.log(b)
console.log('')
b = sort(b, { ascending: true }, 'test')
console.log(b)

console.log(a)
console.log(c)
const d = merge(a, c)
console.log(d)
