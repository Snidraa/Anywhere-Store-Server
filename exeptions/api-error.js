module.exports = class ApiError extends Error {
	constructor(status, message, errors = []) {
		status;
		errors;

		super(message);
		this.status = status;
		this.errors = errors;
	}

	static UnauthorizedError() {
		return new ApiError(401, 'User not authorized');
	}

	static badRequest(message, errors = []) {
		return new ApiError(404, message, errors);
	}

	static internal(message, errors = []) {
		return new ApiError(500, message, errors);
	}

	static forbidden(message, errors = []) {
		return new ApiError(403, message, errors);
	}
};
