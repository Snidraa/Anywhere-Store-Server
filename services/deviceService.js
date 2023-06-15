const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo, Rating } = require('../models/models');
const ApiError = require('../exeptions/api-error');
const getRatingData = require('../middlewares/getRatingData');

class DeviceService {
	async create(name, price, brandId, typeId, info, img) {
		let fileName = uuid.v4() + '.jpg';
		img.mv(path.resolve(__dirname, '..', 'static', 'device', `${typeId}`, fileName));

		const device = await Device.create({ name, price, brandId, typeId, img: fileName });

		if (info) {
			info = JSON.parse(info);
			info.forEach(i => {
				DeviceInfo.create({
					title: i.title,
					description: i.description,
					deviceId: device.id,
				});
			});
		}

		return device;
	}

	async getAll(brandId, typeId, limit = 9, page = 1) {
		let devices;
		let offset = page * limit - limit;

		if (!brandId && !typeId) {
			devices = await Device.findAndCountAll({ limit, offset });
		}
		if (!brandId && typeId) {
			devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
		}
		if (brandId && !typeId) {
			devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
		}
		if (brandId && typeId) {
			devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset });
		}

		if (!devices.count) {
			throw ApiError.badRequest(`Devices not found`);
		}
		return devices;
	}

	async getOne(id) {
		const device = await Device.findOne({
			where: { id },
			include: [{ model: DeviceInfo, as: 'info' }],
		});
		if (!device) {
			throw ApiError.badRequest(`Device with id ${id} not exist`);
		}
		return device;
	}

	async updateRating(id) {
		const ratingData = await Rating.findAndCountAll({ where: { deviceId: id } });
		const { rate, ratesCount } = getRatingData(ratingData);
		await Device.update({ rating: rate, ratesCount: ratesCount }, { where: { id } });
		const device = await Device.findOne({ where: { id } });
		return device;
	}

	async deleteOne(id) {
		const candidate = await Device.findOne({ where: { id } });
		if (!candidate) {
			throw ApiError.badRequest(`Device with id ${id} not exist`);
		}
		await Device.destroy({ where: { id } });
		return candidate;
	}
}

module.exports = new DeviceService();
