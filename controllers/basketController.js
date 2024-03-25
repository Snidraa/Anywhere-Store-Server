const basketService = require('../services/basketService');

class BasketController {
	async addDevice(req, res, next) {
		try {
			const { basketId, deviceId, count } = req.query;
			const deviceData = await basketService.addDevice(basketId, deviceId, count);
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
			const { basketId, deviceId, count } = req.query;
			const device = await basketService.removeDevice(basketId, deviceId, count);
			return res.json(device);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new BasketController();
