const ApiError = require('../exeptions/api-error');
const reviewService = require('../services/reviewService');

class ReviewController {
	async addReview(req, res, next) {
		try {
			const { userId, deviceId, userRate, userComment } = req.query;
			const device = await reviewService.addReview(userId, deviceId, userRate, userComment);
			return res.json(device);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async confirmReview(req, res, next) {
		try {
			const { userId, deviceId, confirmed } = req.query;
			const device = await reviewService.updateReviewStatus(userId, deviceId, confirmed);
			return res.json(device);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async removeReview(req, res, next) {
		try {
			const { userId, deviceId } = req.query;
			const device = await reviewService.removeReview(userId, deviceId);
			return res.json(device);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}
}

module.exports = new ReviewController();
