const ApiError = require('../exeptions/api-error');
const tokenService = require('../services/tokenService');

module.exports = function (req, res) {
	const authorizationHeader = req.headers.authorization;
	if (!authorizationHeader) {
		throw ApiError.UnauthorizedError();
	}

	const accessToken = authorizationHeader.split(' ')[1];
	if (!accessToken) {
		throw ApiError.UnauthorizedError();
	}

	const userData = tokenService.validateAccessToken(accessToken);
	if (!userData) {
		throw ApiError.UnauthorizedError();
	}

	return userData;
};
