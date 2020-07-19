import { HttpCodes } from './http'

export const HandleError = (err): void => {
	const { status } = err?.response || {}

	if (!status) {
		// SnackBarHandler.error('Erro de conexão...')
		throw ''
	}

	switch (status) {
		case HttpCodes.APPLICATION_EXCEPTION:
			// SnackBarHandler.error(err.response.data.error.message)
			throw ''
		case HttpCodes.NOT_FOUND:
			// SnackBarHandler.error(err.response.data.error.message)
			throw ''
		case HttpCodes.BAD_REQUEST:
			// SnackBarHandler.error(err.response.data.error.message)
			throw ''
		case HttpCodes.APPLICATION_EXCEPTION:
			// SnackBarHandler.error(err.response.data.error.message)
			throw ''
		default:
			throw ''
	}
}

export const throwApiException = (message = 'Algo deu errado') => {
	throw {
		code: HttpCodes.APPLICATION_EXCEPTION,
		message
	}
}

export const createGuard = <H extends (error: Error) => any>(handler: H) => <
	F extends (...params: any[]) => any
>(
	callback: F
) => <P extends Parameters<F>>(
	...props: P
): ReturnType<F> | ReturnType<H> | void => {
	try {
		return callback(...props)
	} catch (error) {
		return handler(error)
	}
}

export const guarded = createGuard(console.log)
