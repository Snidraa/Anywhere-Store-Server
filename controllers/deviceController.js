const ApiError = require('../exeptions/api-error');
const deviceService = require('../services/deviceService');
const ratingService = require('../services/reviewService');

class DeviceController {
	async create(req, res, next) {
		try {
			const { name, price, brandId, typeId, info } = req.body;
			const { img } = req.files;
			const device = await deviceService.create(name, price, brandId, typeId, info, img);

			return res.json(device);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async getAll(req, res, next) {
		try {
			let { brandId, typeId, limit, page } = req.query;
			const devices = await deviceService.getAll(brandId, typeId, limit, page);
			return res.json(devices);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async getOne(req, res, next) {
		try {
			const { id } = req.params;
			const device = await deviceService.getOne(id);
			return res.json(device);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async deleteOne(req, res, next) {
		try {
			const { id } = req.params;
			const candidate = await deviceService.deleteOne(id);
			return res.json([`Device with id ${candidate.id} deleted`, candidate]);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}
}

module.exports = new DeviceController();
