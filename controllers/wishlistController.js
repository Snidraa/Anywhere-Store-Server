const wishlistService = require('../services/wishlistService');

class WishlistController {
	async addDevice(req, res, next) {
		try {
			const { wishlistId, deviceId } = req.query;
			const deviceData = await wishlistService.addDevice(wishlistId, deviceId);
			return res.json(deviceData);
		} catch (error) {
			next(error);
		}
	}

	async getAllDevices(req, res, next) {
		try {
			const { wishlistId } = req.query;
			const devices = await wishlistService.getAllDevices(wishlistId);
			return res.json(devices);
		} catch (error) {
			next(error);
		}
	}

	async removeDevice(req, res, next) {
		try {
			const { wishlistId, deviceId } = req.query;
			const device = await wishlistService.removeDevice(wishlistId, deviceId);
			return res.json(device);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new WishlistController();
