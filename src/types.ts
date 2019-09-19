export type CompareResult = -1 | 0 | 1
export type CompareFn<T> = (a: T, b: T) => CompareResult
