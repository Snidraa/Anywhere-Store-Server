const decodeToken = require('./accessToken-middleware');

module.exports = function (role) {
	return function (req, res, next) {
		try {
			if (req.method === 'OPTIONS') {
				next();
			}
			const decoded = decodeToken(req, res);
			if (!decoded.roles.includes(role)) {
				return res.status(403).json({ message: 'Access denied' });
			}
			req.user = decoded;
			next();
		} catch (error) {
			next(error);
		}
	};
};
