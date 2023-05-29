const basketService = require('../services/basketService');

class BasketController {
	async addDevice(req, res, next) {
		try {
			const { basketId, deviceId } = req.query;
			const deviceData = await basketService.addDevice(basketId, deviceId);
			return res.json(deviceData);
		} catch (error) {
			next(error);
		}
	}

	async getAllDevices(req, res, next) {
		try {
			const { basketId } = req.query;
			const devices = await basketService.getAllDevices(basketId);
			return res.json(devices);
		} catch (error) {
			next(error);
		}
	}

	async removeDevice(req, res, next) {
		try {
			const { basketId, deviceId } = req.query;
			const device = await basketService.removeDevice(basketId, deviceId);
			return res.json(device);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new BasketController();
