const decodeToken = require('./accessToken-middleware');

module.exports = function (req, res, next) {
	try {
		if (req.method === 'OPTIONS') {
			next();
		}
		const decoded = decodeToken(req, res);
		req.user = decoded;
		next();
	} catch (error) {
		next(error);
	}
};
