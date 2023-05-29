const typeService = require('../services/typeService');

class TypeController {
	async create(req, res) {
		const { name } = req.body;
		const type = await typeService.create(name);
		return res.json(type);
	}

	async getAll(req, res) {
		const types = await typeService.getAll();
		return res.json(types);
	}

	async deleteOne(req, res) {
		const { id } = req.params;
		const candidate = await typeService.deleteOne(id);
		return res.json([`Type with id ${candidate.id} deleted`, candidate]);
	}
}

module.exports = new TypeController();
