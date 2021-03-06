import { A, L, O } from 'ts-toolbelt'

import { satisfiesAll, complement } from './function'
import { Maybe, ValidPropType } from './interfaces/generic'

export function pickKeys<O, K extends keyof O>(
	keys: Array<K>,
	obj: O
): Pick<O, K> {
	const newObj = {} as O

	for (const key of keys) {
		newObj[key] = obj[key]
	}

	return newObj
}

export function omitKeys<O, K extends keyof O>(
	keys: Array<K>,
	obj: O
): Omit<O, K> {
	const newObj = {} as O

	for (const key of Object.keys(obj)) {
		if (!keys.includes(key as K)) {
			newObj[key] = obj[key]
		}
	}

	return newObj
}

export const pickProp = <K extends ValidPropType>(prop: K) => <
	O extends { [key in K]?: any }
>(
	obj: O
): O[K] => {
	if (!obj) {
		throw TypeError(`Cannot convert ${obj} to object`)
	}

	return obj[prop]
}

export function getSafe<T extends object, P extends L.List<A.Index>>(
	props: A.Cast<P, O.PathValid<T, P>>,
	obj: T
): Maybe<O.Path<T, P>> {
	if (!obj) return undefined

	const val = obj[props[0]]

	if (val === undefined || props.length === 1) return val

	return getSafe(val, props.slice(1))
}

const isObj = (val) => val === new Object(val)

const isNotArray = complement(Array.isArray)

const isValidObj = satisfiesAll(isObj, isNotArray)

const isEmptyObj = (val) => !Object.keys(val).length

const isNotEmptyObj = complement(isEmptyObj)

const isValidObjAndNotEmpty = satisfiesAll(isValidObj, isNotEmptyObj)

const mapValsReducer = (vals) => (col, key, i) => ({ ...col, [key]: vals[i] })

const resolveVal = (v) => (isValidObjAndNotEmpty(v) ? getObjPromise(v) : v)

/**
 * resolveObject
 * @param obj object with props that are promises
 * @returns promise that resolves into object with all props resolved
 */
export const getObjPromise = async <T>(obj: T): Promise<T> => {
	const values = Object.values(obj)

	const valuePromises = values.map(resolveVal)

	const resolvedValues = await Promise.all(valuePromises)

	const objKeys = Object.keys(obj)

	const newObj = objKeys.reduce(mapValsReducer(resolvedValues), {})

	return newObj
}

/**
 * isEmptyOrFalsy checks whether array or object are empty
 * and string/ num / undefined / null are falsy
 * @param elem any element to validate
 * @returns boolean
 */
export const isEmptyOrFalsy = (elem: any): boolean => {
	if (Array.isArray(elem)) return Boolean(elem.length)

	if (isValidObj(elem)) return isNotEmptyObj(elem)

	return Boolean(elem)
}

export const validateObjValues = <T extends object>(object: T): boolean => {
	return Object.values(object).map(isEmptyOrFalsy).every(Boolean)
}

/**
 * -compareProp
 * @param checkEqual whether to check if prop is equal or different
 * @param prop property to compare
 * @param item1 item to pick prop from and compare
 * @param item2 item to pick prop and compare with item1
 */
const compareProp = function (
	checkEqual: boolean
): <K extends ValidPropType, T extends { [key in K]: any }>(
	prop: K
) => (item1: Maybe<T | T[K]>) => (item2: Maybe<T | T[K]>) => boolean {
	return (prop) => (item1) => (item2) => {
		if (!item1 || !item2) return false

		const toCompare1 = isValidObjAndNotEmpty(item1) ? item1[prop] : item1
		const toCompare2 = isValidObjAndNotEmpty(item2) ? item2[prop] : item2

		const matches = checkEqual
			? toCompare1 === toCompare2
			: toCompare1 !== toCompare2

		return Boolean(item1 && item2 && matches)
	}
}

export const isPropEqual = compareProp(true)

export const isPropDifferent = compareProp(false)

export const updateDeep = function <T>(path: string, payload: any, obj: T): T {
	const created = JSON.parse(JSON.stringify(obj))
	const pathArr = path.split('.')
	const len = pathArr.length - 1
	let nested = created
	for (let i = 0; i <= len; i++) {
		const key = pathArr[i]
		if (i === len) {
			if (payload instanceof Function) {
				nested[key] = payload(nested[key])
			} else {
				nested[key] = payload
			}
		}
		nested = nested[key]
	}
	return created
}
