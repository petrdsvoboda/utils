import { Map, update, get } from './record'

let a: Record<'1' | '2' | '3', { test: string; another: number }> = {
	'1': { test: '111', another: 111 },
	'2': { test: '222', another: 222 },
	'3': { test: '333', another: 333 }
}

console.log(get(a, '1', 'test'))

console.log(a)
a = update(a, ['3'], x => ({ ...x, test: 's' }))
console.log(a)
