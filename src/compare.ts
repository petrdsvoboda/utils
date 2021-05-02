import * as arr from './array'
import { nil } from './base'
import { fromArray, merge, set } from './record'

type CompareSchemaType = 'string' | 'number' | 'boolean' | 'date'
type CompareSchemaObject = readonly [type: 'object', value: CompareSchema]
type CompareSchemaArray = readonly [type: 'array', value: CompareSchemaType]
type CompareSchemaObjectArray = readonly [
	type: 'array',
	value: CompareSchema,
	key?: string
]
export interface CompareSchema {
	[key: string]:
		| CompareSchemaType
		| CompareSchemaObject
		| CompareSchemaArray
		| CompareSchemaObjectArray
}

export interface CompareObject {
	[key: string]: any | CompareObject
}

type UnaryChange<T> = [type: 'added' | 'removed', value: T]
type BinaryChange<T> = [type: 'modified', value: [T, T]]
type Change<T> = UnaryChange<T> | BinaryChange<T>

export interface CompareResult {
	[key: string]: Change<any> | CompareResult
}

const isCompareType = (value: any): value is CompareSchemaType =>
	['string', 'number', 'boolean', 'date'].includes(value)
const isCompareObject = (value: any): value is CompareSchemaObject =>
	value?.[0] === 'object'
const isCompareArray = (value: any): value is CompareSchemaArray =>
	value?.[0] === 'array' && isCompareType(value?.[1])
const isCompareObjectArray = (value: any): value is CompareSchemaObjectArray =>
	value?.[0] === 'array' && !isCompareType(value?.[1])

const compareDates = (a: any, b: any) =>
	new Date(a).getTime() !== new Date(b).getTime()
const compareValues = (
	schema: CompareSchema,
	a: CompareObject,
	b: CompareObject,
	key: string
): CompareResult => {
	let changes: CompareResult = {}
	if (nil(a[key]) && nil(b[key])) {
		return changes
	} else if (nil(a[key])) {
		changes = set(changes, [key], ['added', b[key]])
	} else if (nil(b[key])) {
		changes = set(changes, [key], ['removed', a[key]])
	} else {
		const modified =
			schema[key] === 'date'
				? compareDates(a[key], b[key])
				: a[key] !== b[key]
		if (!modified) return changes
		changes = set(changes, [key], ['modified', [a[key], b[key]]])
	}
	return changes
}

const getArraySchema = (
	a: any[],
	b: any[],
	schema: any,
	indexKey?: string
): CompareSchema => {
	if (indexKey) {
		const indexes = arr.merge(
			a.map(x => x[indexKey]),
			b.map(x => x[indexKey])
		)
		return indexes.reduce((acc, curr) => ({ ...acc, [curr]: schema }), {})
	} else {
		const len = a.length > b.length ? a.length : b.length
		return Array(len)
			.fill(undefined)
			.reduce((acc, _, index) => ({ ...acc, [index]: schema }), {})
	}
}

const compareKey = (
	schema: CompareSchema,
	a: CompareObject,
	b: CompareObject
) => (changes: CompareResult, key: string) => {
	const schemaValue = schema[key]
	if (nil(a[key]) || nil(b[key]) || isCompareType(schemaValue)) {
		return merge(changes, compareValues(schema, a, b, key))
	} else if (isCompareObject(schemaValue)) {
		const [_, nestedSchema] = schemaValue
		const result = compare_(nestedSchema, a[key], b[key])
		return set(changes, [key], result)
	} else if (isCompareArray(schemaValue)) {
		const [_, nestedType] = schemaValue
		const arraySchema = getArraySchema(a[key], b[key], nestedType)
		const result = compare_(arraySchema, a[key], b[key])
		return set(changes, [key], result)
	} else if (isCompareObjectArray(schemaValue)) {
		const [_, nestedSchema, indexKey] = schemaValue
		const aArr = fromArray(a[key], { key: indexKey as any })
		const bArr = fromArray(b[key], { key: indexKey as any })
		const arraySchema = getArraySchema(
			a[key],
			b[key],
			nestedSchema,
			indexKey
		)
		const result = Object.keys(arraySchema).reduce((acc, curr) => {
			const compareRes = compareValues(arraySchema, aArr, bArr, curr)
			const currCompare = compareRes[curr] as Change<any>
			return {
				...acc,
				[curr]: ['added', 'removed'].includes(currCompare[0])
					? currCompare
					: compare_(
							arraySchema[curr] as any,
							aArr[curr] as any,
							bArr[curr] as any
					  )
			}
		}, {})
		return set(changes, [key], result)
	}

	return changes
}

export const compare_ = (
	schema: CompareSchema,
	a: CompareObject,
	b: CompareObject
): CompareResult => {
	const keys = Object.keys(schema)
	return keys.reduce<CompareResult>(compareKey(schema, a, b), {})
}

export const compare = (
	schema: CompareSchema,
	a?: CompareObject,
	b?: CompareObject
): { version: number; result?: CompareResult } => {
	const version = 2
	if (!a || !b) return { version }
	const result = compare_(schema, a, b)
	return { version, result }
}

const isChange = (value: any): value is Change<any> =>
	['added', 'removed', 'modified'].includes(value?.[0])
const isBinaryChange = (value: any): value is BinaryChange<any> =>
	['modified'].includes(value?.[0])

type SimpleMergeElType = { [key: string]: Change<any> | undefined }
const simpleMergeCompare = (
	left: SimpleMergeElType,
	right: SimpleMergeElType
) => (acc: CompareResult, curr: string): SimpleMergeElType => {
	const leftVal = left[curr]
	return undefined as any
}

export const mergeCompare = (
	left: CompareResult,
	right: CompareResult
): CompareResult => {
	const keys = Object.keys(right)
	return keys.reduce((acc, curr) => {
		const lValue = left[curr]
		const rValue = right[curr]
		if (!lValue) return { ...acc, [curr]: rValue }

		let result: Change<any> | CompareResult
		if (isChange(lValue) && isChange(rValue)) {
			const lType = lValue[0]
			if (isBinaryChange(lValue)) {
				if (isBinaryChange(rValue)) {
					result = [lType, [lValue[1][0], rValue[1][1]]]
				} else {
					result = rValue
				}
			} else {
				if (isBinaryChange(rValue)) {
					result = [lType, [lValue[1], rValue[1][1]]]
				} else {
					result = [lType, rValue[1]]
				}
			}
		} else if (!isChange(lValue) && !isChange(rValue)) {
			result = mergeCompare(lValue, rValue)
		} else {
			result = {}
		}
		return set(acc, [curr], result)

		// if (left[curr] === undefined || Array.isArray(right[curr])) {
		// 	return simpleMergeCompare(left as any, right as any)(
		// 		acc,
		// 		curr as any
		// 	) as any
		// } else {
		// 	const leftMap = left[curr] as CompareSchemaResultArray<{
		// 		[key: string]: null
		// 	}>
		// 	const rightMap = right[curr] as CompareSchemaResultArray<{
		// 		[key: string]: null
		// 	}>

		// 	acc[curr] = Object.keys(rightMap).reduce((map, key) => {
		// 		const l = rightMap[key]
		// 		const r = rightMap[key]

		// 		if (r[0] === 'added' || r[0] === 'deleted') {
		// 			map[key] = r
		// 		} else {
		// 			map[key][1] = simpleMergeCompare(l[1], r[1])(
		// 				l[1],
		// 				Object.keys(r[1]) as any
		// 			)
		// 		}

		// 		return map
		// 	}, leftMap) as any
		// }

		// return acc
	}, left)
}
