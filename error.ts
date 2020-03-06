import { HttpCodes } from '@constants/http'

export const HandleError = (err): void => {
	if (!err || !err.response || !err.response.status) {
		// SnackBarHandler.error('Erro de conexão...')
		throw ''
	}

	if (err.response.status === HttpCodes.APPLICATION_EXCEPTION) {
		// SnackBarHandler.error(err.response.data.error.message)
		throw ''
	}

	if (err.response.status === HttpCodes.NOT_FOUND) {
		// SnackBarHandler.error('Servidor indisponível...!')
		throw ''
	}
	if (err.response.status === HttpCodes.INTERNAL_SERVER_ERROR) {
		// SnackBarHandler.error('Servidor indisponível...')

		throw ''
	}
	if (err.response.status === HttpCodes.BAD_REQUEST) {
		throw err.response.data.content
	}

	throw ''
}
