const roleService = require('../services/roleService');

class RoleController {
	async createRole(req, res, next) {
		const { name } = req.body;
		if (!name) {
			return next(ApiError.badRequest('Uncorrect name of role'));
		}
		const roleData = await roleService.create(name);
		return res.json(roleData);
	}

	async getRoles(req, res, next) {
		try {
			const roles = await roleService.getAllRoles();
			return res.json(roles);
		} catch (error) {
			next(error);
		}
	}

	async deleteRole(req, res, next) {
		try {
			const { id } = req.params;
			const role = await roleService.deleteRole(id);
			return res.json(role);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new RoleController();
