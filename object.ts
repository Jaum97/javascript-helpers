import { Maybe, ValidPropType } from './interfaces/generic';
import { A, L, O } from 'ts-toolbelt';

export function pickKeys<O, K extends keyof O>(
	obj: O,
	keys: Array<K>
): Pick<O, K> {
	const newObj = {} as O

	for (const key of keys) {
		newObj[key] = obj[key]
	}

	return newObj
}

export function omitKeys<O, K extends keyof O>(
	obj: O,
	keys: Array<K>
): Omit<O, K> {
	const newObj = {} as O
	for (const key of Object.keys(obj)) {
		if (!keys.includes(key as K)) {
			newObj[key] = obj[key]
		}
	}

	return newObj
}

export const pickProp = <K extends ValidPropType>(prop: K) => <O extends { [key in K]?: any }>(obj: O): O[K] => {
	if (!obj) {
		throw TypeError(`Cannot convert ${obj} to object`)
	}

	return obj[prop]
}

export function getSafe<T extends object, P extends L.List<A.Index>
>(obj: T, props: A.Cast<P, O.PathValid<T, P>>): Maybe<O.Path<T, P>> {

	if (!obj) return undefined

	const val = obj[props[0]]

	if (val === undefined || props.length === 1) return val

	return getSafe(val, props.slice(1)) 
}
