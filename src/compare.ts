import { nil } from './base'

type ChangeVal = string | number
type UnaryChange = { type: 'added' | 'deleted'; val: ChangeVal }
type BinaryChange = { type: 'changed'; val: [ChangeVal, ChangeVal] }
type Change = UnaryChange | BinaryChange

type CompareSchemaObject = CompareSchema & { _type: 'object' | 'array' }
interface CompareSchema {
	[key: string]: null | CompareSchemaObject
}

type CompareObject<TSchema extends CompareSchema> = {
	[key in keyof TSchema]:
		| any
		| CompareObject<any>
		| Array<CompareObject<any> & { id: string | number }>
}

type ResultObject<T extends CompareSchemaObject> = Result<Omit<T, '_type'>>
type ResultArray<T extends CompareSchemaObject> = Array<
	T & { id: string | number; _type: 'added' | 'changed' | 'deleted' }
>
export type Result<TSchema extends CompareSchema> = {
	[K in keyof TSchema]?: TSchema[K] extends null
		? Change
		: NonNullable<TSchema[K]>['_type'] extends 'object'
		? ResultObject<NonNullable<TSchema[K]>>
		: ResultArray<NonNullable<TSchema[K]>>
}

const parseVal = (val: any): string | number | undefined => {
	if (typeof val === 'object') {
		if (val instanceof Date) {
			return val.toLocaleDateString('cs')
		} else if (Array.isArray(val)) {
			return val.map(x => JSON.stringify(x)).join(', ')
		} else {
			return JSON.stringify(val)
		}
	} else if (typeof val === 'string' || typeof val === 'number') {
		return val
	} else if (typeof val === 'boolean') {
		return val ? 'Yes' : 'No'
	} else {
		return undefined
	}
}

export const compare = <TSchema extends CompareSchema>(
	schema: TSchema,
	prev: CompareObject<TSchema> | undefined,
	curr: CompareObject<TSchema> | undefined
): Result<TSchema> | undefined => {
	if (!prev || !curr) return undefined

	const keys = Object.keys(schema) as (keyof typeof schema)[]
	return keys.reduce<Result<TSchema>>((changes, key) => {
		const value = schema[key]
		if (nil(prev[key]) || nil(curr[key])) return changes

		let prevVal = prev[key]
		let currVal = curr[key]
		let change: Change | ResultObject<NonNullable<typeof value>> | undefined
		if (value === null) {
			const prevVal = parseVal(prev[key])
			const currVal = parseVal(curr[key])

			if ((!prevVal && !currVal) || prevVal === currVal) {
				change = undefined
			} else if (!prevVal) {
				change = { type: 'added', val: currVal } as UnaryChange
			} else if (!currVal) {
				change = { type: 'deleted', val: currVal } as UnaryChange
			} else {
				change = {
					type: 'changed',
					val: [prevVal, currVal]
				} as BinaryChange
			}
		} else {
			const { _type, ...bareValue } = value as NonNullable<
				TSchema[keyof TSchema]
			>
			if (value._type === 'object') {
				change = compare(bareValue, prevVal, currVal)
			} else {
				if (!Array.isArray(prevVal) || !Array.isArray(currVal))
					return changes

				change = compare(bareValue, prevVal, currVal)
			}
		}

		return !change ? changes : { ...changes, [key]: change }
	}, {})
}

type SimpleMergeElType = { [key: string]: Change | undefined }
const simpleMergeCompare = (
	left: SimpleMergeElType,
	right: SimpleMergeElType
) => (acc: Result<any>, curr: string): SimpleMergeElType => {
	const leftVal = left[curr]
	const rightVal = right[curr]
	if (leftVal === undefined) {
		acc[curr] = rightVal
	} else if (Array.isArray(rightVal)) {
		acc[curr] = [(leftVal as Change)[0], (rightVal as Change)[1]] as any
	}
	return acc as any
}

type S = {
	a: null
	b: null
	c: { _type: 'object'; a: null }
	d: { _type: 'array'; a: null }
}

const a = {
	a: 1,
	b: 2,
	c: {
		a: 1
	},
	d: [{ id: 1, a: 1 }]
}

const res = {
	a: [1, 2],
	b: [2, 3],
	c: {
		a: [1, 2]
	},
	d: [{ id: 1, _change: 'added', a: [undefined, 1] }]
}

export const mergeCompare = <TSchema extends CompareSchema>(
	left: Result<TSchema>,
	right: Result<TSchema>
): Result<TSchema> => {
	left = (Object.keys(right) as Array<keyof typeof right>).reduce(
		(acc, curr) => {
			if (left[curr] === undefined || Array.isArray(right[curr])) {
				return simpleMergeCompare(left as any, right as any)(
					acc,
					curr as any
				) as any
			} else {
				const leftMap = left[curr] as CompareSchemaResultArray<{
					[key: string]: null
				}>
				const rightMap = right[curr] as CompareSchemaResultArray<{
					[key: string]: null
				}>

				acc[curr] = Object.keys(rightMap).reduce((map, key) => {
					const l = rightMap[key]
					const r = rightMap[key]

					if (r[0] === 'added' || r[0] === 'deleted') {
						map[key] = r
					} else {
						map[key][1] = simpleMergeCompare(l[1], r[1])(
							l[1],
							Object.keys(r[1]) as any
						)
					}

					return map
				}, leftMap) as any
			}

			return acc
		},
		left
	)

	return left
}
