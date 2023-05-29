const ApiError = require('../exeptions/api-error');
const ratingService = require('../services/ratingService');

class RatingController {
	async rate(req, res, next) {
		try {
			const { userId, deviceId, userRate } = req.query;
			const device = await ratingService.addRate(userId, deviceId, userRate);
			return res.json(device);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async unrate(req, res, next) {
		try {
			const { userId, deviceId } = req.query;
			const device = await ratingService.removeRate(userId, deviceId);
			return res.json(device);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}
}

module.exports = new RatingController();
