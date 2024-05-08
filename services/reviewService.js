const ApiError = require("../exeptions/api-error");
const { Review, Device } = require("../models/models");
const deviceService = require("./deviceService");

class ReviewService {
  async addReview(userId, deviceId, userRate, userComment) {
    const candidate = await Device.findOne({ where: { id: deviceId } });
    if (!candidate) {
      throw ApiError.badRequest(`Device not found`);
    }

    const isRateExist = await Review.findOne({ where: { userId, deviceId } });
    if (!isRateExist) {
      const addedReview = await Review.create({
        userId,
        deviceId,
        rate: userRate,
        comment: userComment,
      });
      const device = await deviceService.updateReview(deviceId);
      return device;
    }

    const addedReview = await Review.update(
      { rate: userRate, comment: userComment },
      { where: { userId, deviceId } },
    );
    const device = await deviceService.updateReveiew(deviceId);

    return device;
  }

  async confirmReview(userId, deviceId, confirmed) {
    const candidate = await Device.findOne({ where: { id: deviceId } });
    if (!candidate) {
      throw ApiError.badRequest(`Device not found`);
    }

    const isReviewExist = await Review.findOne({ where: { userId, deviceId } });
    if (!isReviewExist) {
      throw ApiError.badRequest(`Review not found`);
    }

    const confirmedReview = await Review.update(
      { confirmed: confirmed },
      { where: { userId, deviceId } },
    );

    return confirmedReview;
  }

  async removeReview(userId, deviceId) {
    const isRateExist = await Review.findOne({ where: { userId, deviceId } });
    if (!isRateExist) {
      throw ApiError.badRequest(`You doesn't rate this device`);
    }

    await Review.destroy({ where: { userId, deviceId } });
    const device = await deviceService.updateReview(deviceId);

    return device;
  }
}
module.exports = new ReviewService();
