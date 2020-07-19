import { F } from 'ts-toolbelt'

/**
 * curry receives a function of n arguments and return 
 * functions that receive the arguments partially
 * @param func function to be curried, cant have rest arguments
	@example
	const add3 = (a, b, c) => a + b + c

	const res = curry(add3)(1)(2)(3) // 6

	const res2 = curry(add3)(2,3)()(1) // 6
 */
export function curry<T extends F.Function>(func: T): F.Curry<T> {
	if (func.length === 0) return func
	return function curried(...args) {
		if (args.length >= func.length) {
			return func.apply(this, args)
		} else {
			return function (...args2) {
				return curried.apply(this, args.concat(args2))
			}
		}
	}
}

/**
 * A pipe function takes an n sequence of operations; 
 * in which each operation takes an argument; process it; 
 * and gives the processed output as an input for the next operation in the sequence. 
 * The result of a pipe function is a function that is a bundled up version of 
 * the sequence of operations.
 * @param fns functions to pipe
 * @example 
 * const add2 = (x) => x + 2

	const double = (x) => x * 2

	const res = pipe(add2, double)(2) // 8

	const res2 = pipe(double, add2)(2) // 6
 */
export const pipe = function <Fns extends Array<F.Function>>(
	...fns: Fns
): F.Piped<Fns> {
	return function (value) {
		return fns.reduce(
			(currentVal, currentFn) => currentFn(currentVal),
			value
		)
	}
}
