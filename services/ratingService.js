const ApiError = require('../exeptions/api-error');
const { Rating, Device } = require('../models/models');
const deviceService = require('./deviceService');

class RatingService {
	async addRate(userId, deviceId, userRate) {
		const candidate = await Device.findOne({ where: { id: deviceId } });
		if (!candidate) {
			throw ApiError.badRequest(`Device not found`);
		}

		const isRateExist = await Rating.findOne({ where: { userId, deviceId } });
		if (!isRateExist) {
			const addedRating = await Rating.create({ userId, deviceId, rate: userRate });
			const device = await deviceService.updateRating(deviceId);
			return device;
		}

		const addedRating = await Rating.update({ rate: userRate }, { where: { userId, deviceId } });
		const device = await deviceService.updateRating(deviceId);

		return device;
	}

	async removeRate(userId, deviceId) {
		const isRateExist = await Rating.findOne({ where: { userId, deviceId } });
		if (!isRateExist) {
			throw ApiError.badRequest(`You doesn't rate this device`);
		}

		await Rating.destroy({ where: { userId, deviceId } });
		const device = await deviceService.updateRating(deviceId);

		return device;
	}
}
module.exports = new RatingService();
