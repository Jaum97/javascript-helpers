export const satisfiesAll = <T extends (...args: any[]) => boolean>(
	...fns: Array<T>
) => (arg: any): boolean => fns.every((f) => f(arg))

export const satisfiesAny = <T extends (...args: any[]) => boolean>(
	...fns: Array<T>
) => (arg: any): boolean => fns.some((f) => f(arg))

export const complement = <F extends (...args: any[]) => boolean>(fn: F) => (
	...args: any[]
): boolean => !fn(...args)
