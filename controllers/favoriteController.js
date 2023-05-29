const favoriteService = require('../services/favoriteService');

class FavoriteController {
	async addDevice(req, res, next) {
		try {
			const { favoriteId, deviceId } = req.query;
			const deviceData = await favoriteService.addDevice(favoriteId, deviceId);
			return res.json(deviceData);
		} catch (error) {
			next(error);
		}
	}

	async getAllDevices(req, res, next) {
		try {
			const { favoriteId } = req.query;
			const devices = await favoriteService.getAllDevices(favoriteId);
			return res.json(devices);
		} catch (error) {
			next(error);
		}
	}

	async removeDevice(req, res, next) {
		try {
			const { favoriteId, deviceId } = req.query;
			const device = await favoriteService.removeDevice(favoriteId, deviceId);
			return res.json(device);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new FavoriteController();
