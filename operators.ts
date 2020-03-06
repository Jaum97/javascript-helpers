
import { F } from 'ts-toolbelt'

export const pipe: F.Pipe = function(...fns) {
	return function(value) {
		return fns.reduce((currentVal, currentFn) => currentFn(currentVal) , value)
	}
}