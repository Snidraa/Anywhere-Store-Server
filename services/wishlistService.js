const ApiError = require("../exeptions/api-error");
const { WishlistDevice, Device } = require("../models/models");

class WishlistService {
  async addDevice(wishlistId, deviceId) {
    const device = await Device.findOne({ where: { id: deviceId } });
    if (!device) {
      throw ApiError.badRequest(`Device not found`);
    }
    const candidate = await WishlistDevice.findOne({
      where: { wishlistId, deviceId },
    });
    if (candidate) {
      throw ApiError.badRequest(`Device already exist`);
    }
    const addedDevice = await WishlistDevice.create({ wishlistId, deviceId });
    return addedDevice;
  }

  async getAllDevices(wishlistId) {
    const wishlistData = await WishlistDevice.findAll({
      where: { wishlistId },
      include: Device,
    });
    const devices = wishlistData.map((item) => item.device);
    return devices;
  }

  async removeDevice(wishlistId, deviceId) {
    const candidate = await WishlistDevice.findOne({
      where: { wishlistId, deviceId },
    });
    if (!candidate) {
      throw ApiError.badRequest(`Device not exist in the wishlist`);
    }
    await WishlistDevice.destroy({ where: { wishlistId, deviceId } });
    return candidate;
  }
}
module.exports = new WishlistService();
