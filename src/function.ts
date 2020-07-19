export const satisfiesAll = <T extends (...args: any[]) => boolean>(
	...fns: Array<T>
) => (arg: any): boolean => fns.every((f) => f(arg))

export const satisfiesAny = <T extends (...args: any[]) => boolean>(
	...fns: Array<T>
) => (arg: any): boolean => fns.some((f) => f(arg))
