export class HttpCodes {
	static get SUCCESS(): 200 {
		return 200
	}

	static get BAD_REQUEST(): 400 {
		return 400
	}

	static get UNAUTHORIZED(): 401 {
		return 401
	}

	static get UNAUTHORIZED_LOGOUT(): 418 {
		return 418
	}

	static get NOT_FOUND(): 404 {
		return 404
	}

	static get AWAITING_LIBERATION(): 419 {
		return 419
	}

	static get APPLICATION_EXCEPTION(): 420 {
		return 420
	}

	static get INTERNAL_SERVER_ERROR(): 500 {
		return 500
	}
}
