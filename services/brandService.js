const ApiError = require('../exeptions/api-error');
const { Brand } = require('../models/models');

class BrandService {
	async create(name) {
		const candidate = await Brand.findOne({ where: { name } });
		if (candidate) {
			throw ApiError.badRequest(`Brand "${name}" is already exist`);
		}
		const brand = await Brand.create({ name });
		return brand;
	}

	async getAll() {
		const brands = await Brand.findAll();
		return brands;
	}

	async deleteOne(id) {
		const candidate = await Brand.findOne({ where: { id } });
		if (!candidate) {
			throw ApiError.badRequest(`Brand not exist`);
		}
		await Brand.destroy({ where: { id } });
		return candidate;
	}
}

module.exports = new BrandService();
