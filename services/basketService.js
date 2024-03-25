const ApiError = require('../exeptions/api-error');
const { BasketDevice, Device } = require('../models/models');

class BasketService {
	async addDevice(basketId, deviceId, count) {
		const device = await Device.findOne({ where: { id: deviceId } });
		if (!device) {
			throw ApiError.badRequest(`Device not found`);
		}
		const candidate = await BasketDevice.findOne({ where: { basketId, deviceId } });
		if (candidate) {
			const addedDevice = await BasketDevice.update(
				{ count: count },
				{ where: { basketId, deviceId }, returning: true },
			);
			return addedDevice[1][0];
		}
		const addedDevice = await BasketDevice.create({ basketId, deviceId, count });
		return addedDevice;
	}

	async getAllDevices(basketId) {
		const basketData = await BasketDevice.findAll({ where: { basketId }, include: Device });
		const devices = basketData.map(({ count, device }) => ({ count, device }));
		// basketData.map(item => (devices = [...devices, { count: item.count, device: item.device }]));

		return devices;
	}

	async removeDevice(basketId, deviceId) {
		const candidate = await BasketDevice.findOne({ where: { basketId, deviceId } });
		if (!candidate) {
			throw ApiError.badRequest(`Device not exist in the basket`);
		}
		await BasketDevice.destroy({ where: { basketId, deviceId }, returning: true });
		return candidate;
	}
}
module.exports = new BasketService();
