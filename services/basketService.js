const ApiError = require('../exeptions/api-error');
const { BasketDevice, Device } = require('../models/models');

class BasketService {
	async addDevice(basketId, deviceId) {
		const device = await Device.findOne({ where: { id: deviceId } });
		if (!device) {
			throw ApiError.badRequest(`Device not found`);
		}
		const candidate = await BasketDevice.findOne({ where: { basketId, deviceId } });
		if (candidate) {
			throw ApiError.badRequest(`Device already exist`);
		}
		const addedDevice = await BasketDevice.create({ basketId, deviceId });
		return addedDevice;
	}

	async getAllDevices(basketId) {
		const basketData = await BasketDevice.findAll({ where: { basketId }, include: Device });
		const devices = basketData.map(item => item.device);
		return devices;
	}

	async removeDevice(basketId, deviceId) {
		const candidate = await BasketDevice.findOne({ where: { basketId, deviceId } });
		if (!candidate) {
			throw ApiError.badRequest(`Device not exist in the basket`);
		}
		await BasketDevice.destroy({ where: { basketId, deviceId } });
		return candidate;
	}
}
module.exports = new BasketService();
