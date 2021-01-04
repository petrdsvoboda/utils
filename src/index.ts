export * as array from './array'
export * as base from './base'
export * as date from './date'
export * as number from './number'
export * as record from './record'
export * as string from './string'
export * as types from './types'

// type Seek<T, P extends string> = T extends unknown[]
// 	? P extends `${number}.${infer Rest}`
// 		? Seek<P[number], Rest>
// 		: P extends `${number}`
// 		? T[number]
// 		: void
// 	: P extends `${infer K}.${infer Rest}`
// 	? K extends keyof T
// 		? Seek<T[K], Rest>
// 		: void
// 	: P extends `${infer K}`
// 	? K extends keyof T
// 		? T[K]
// 		: void
// 	: void
// type Lense<P extends string> = <T>(document: T) => Seek<T, P>

// function seek<T, P extends string>(document: T, path: P): Seek<T, P> {
// 	const apath = path.split('.')
// 	let h: any = document
// 	for (const p of apath) {
// 		if (p in h) h = h[p]
// 		else throw new Error(`Invalid path: ${path} at ${p}`)
// 	}
// 	return h
// }

// function lense<P extends string>(path: P): Lense<P> {
// 	const apath = path.split('.')
// 	return (h: any) => {
// 		for (const p of apath) {
// 			if (p in h) h = h[p]
// 			else throw new Error(`Invalid path: ${path} at ${p}`)
// 		}
// 		return h
// 	}
// }

// console.log(s.b.b)
// type X = Lense<'b.b'>
// const se = seek(s, 'b.b')
// console.log(se)

// const l = lense('x.b.c')
// console.log(l(s))

// type ExtractObj<S extends Record<string, unknown>, K> = K extends keyof S
// 	? S[K]
// 	: never

// type Path<
// 	S extends Record<string, unknown>,
// 	T extends readonly unknown[]
// > = T extends readonly [infer T0, ...infer TR]
// 	? TR extends []
// 		? ExtractObj<S, T0> extends never
// 			? readonly []
// 			: readonly [T0]
// 		: ExtractObj<S, T0> extends Record<string, unknown>
// 		? readonly [T0, ...Path<ExtractObj<S, T0>, TR>]
// 		: ExtractObj<S, T0> extends never
// 		? readonly []
// 		: readonly [T0]
// 	: readonly []

// const get = <T extends Record<string, unknown>>(obj: T) => <
// 	P extends unknown[]
// >(
// 	path: Path<T, P>
// ): any => {
// 	return path.reduce((acc, curr) => (acc as any)?.[curr as any], obj)
// }

// type Lens<P extends unknown[]> = <T extends Record<string, unknown>>(
// 	document: T
// ) => Path<T, P>

// const lens = <T extends Record<string, unknown>, TKey extends keyof T>(
// 	key: TKey
// ) => {
// 	return (record: T) => (value: T[keyof T]): T => {
// 		record[key] = value
// 		return record
// 	}
// }

// type Rec = Record<string, any>
// type Lens<
// 	T extends Rec,
// 	X extends unknown[] = Lens2<T[keyof T]>
// > = T[keyof T] extends null ? [] : [keyof T, ...X[]]
// type Lens2<T extends Rec> = [keyof T]

// type X = Path<typeof obj, ['bar', 'ff']>

// const x: Path<typeof obj, ['bar', 'ff']>

// const l = lens('bar')
// const res = l(obj)(23)

type Prev = [never, 0, 1, 2, 3, 4, 5, ...0[]]

type Path<T, D extends number = 5> = [D] extends [never]
	? never
	: T extends Record<string, unknown>
	? {
			[K in keyof T]: [K] | [K, ...Path<T[K], Prev[D]>]
	  }[keyof T]
	: never

type Prop<T, P extends Path<T> | unknown, D extends number = 5> = [D] extends [
	never
]
	? never
	: P extends [infer Head, ...infer Tail]
	? {
			[K in keyof T]: Head extends K
				? Prop<T[Head], Tail, Prev[D]>
				: never
	  }[keyof T]
	: T

function get<T, P extends Path<T>>(obj: T, path: P): Prop<T, P> {
	return (path as any).reduce(
		(acc: any, curr: any) => (acc as any)?.[curr as any],
		obj
	)
}

const s = {
	a: true,
	b: { b: true },
	c: { c: { c: true } },
	x: {
		a: [1, 2, 3],
		b: [4, 5, 6],
		c: [7, 8, 9]
	}
}

console.log(get(s, ['c', 'c']))
console.log(get(s, ['a']))
console.log(get(s, ['c']))
console.log(get(s, ['c', 'c', 'c']))

const x2 = get(s, ['c', 'c'])

type Z = Prop<typeof s, ['c', 'c']>
