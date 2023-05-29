const ApiError = require('../exeptions/api-error');
const { FavoriteDevice, Device } = require('../models/models');

class FavoriteService {
	async addDevice(favoriteId, deviceId) {
		const device = await Device.findOne({ where: { id: deviceId } });
		if (!device) {
			throw ApiError.badRequest(`Device not found`);
		}
		const candidate = await FavoriteDevice.findOne({ where: { favoriteId, deviceId } });
		if (candidate) {
			throw ApiError.badRequest(`Device already exist`);
		}
		const addedDevice = await FavoriteDevice.create({ favoriteId, deviceId });
		return addedDevice;
	}

	async getAllDevices(favoriteId) {
		const favoriteData = await FavoriteDevice.findAll({ where: { favoriteId }, include: Device });
		const devices = favoriteData.map(item => item.device);
		return devices;
	}

	async removeDevice(favoriteId, deviceId) {
		const candidate = await FavoriteDevice.findOne({ where: { favoriteId, deviceId } });
		if (!candidate) {
			throw ApiError.badRequest(`Device not exist in the favorite`);
		}
		await FavoriteDevice.destroy({ where: { favoriteId, deviceId } });
		return candidate;
	}
}
module.exports = new FavoriteService();
