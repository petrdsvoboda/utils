export type CompareResult = -1 | 0 | 1
export type CompareFn<T> = (a: T, b: T) => CompareResult

export type Prev = [never, 0, 1, 2, 3, 4, 5, ...0[]]

// export type Path<T, D extends number = 5> = [D] extends [never]
// 	? never
// 	: T extends Record<string, unknown>
// 	? {
// 			[K in keyof T]: [K] | [K, ...Path<T[K], Prev[D]>]
// 	  }[keyof T]
// 	: never

export type Path<T, D extends number = 4> = [D] extends [never]
	? never
	:
			| [keyof T]
			| {
					[K in keyof T]: [K, ...Path<T[K], Prev[D]>]
			  }[keyof T]

export type Prop<T, P extends [] | [any] | any[]> = P extends [infer U]
	? U extends keyof T
		? T[U]
		: never
	: P extends [infer U, ...infer R]
	? (U extends keyof T
			? T[U] extends infer U2
				? [Prop<U2, R>]
				: never
			: never)[0]
	: any

// export type Prop<T, P extends Path<T>, D extends number = 5> = [D] extends [
// 	never
// ]
// 	? never
// 	: P extends never
// 	? never
// 	: P extends [infer Head, ...infer Tail]
// 	? Head extends keyof T
// 		? Tail extends []
// 			? T[Head]
// 			: Tail extends Path<T[Head]>
// 			? Prop<T[Head], Tail, Prev[D]>
// 			: never
// 		: never
// 	: never
