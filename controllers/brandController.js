const brandService = require('../services/brandService');

class BrandController {
	async create(req, res) {
		const { name } = req.body;
		const brand = await brandService.create(name);
		return res.json(brand);
	}

	async getAll(req, res) {
		const brands = await brandService.getAll();
		return res.json(brands);
	}

	async deleteOne(req, res) {
		const { id } = req.params;
		const candidate = await brandService.deleteOne(id);
		return res.json([`brand with id ${candidate.id} deleted`, candidate]);
	}
}

module.exports = new BrandController();
