const { Role } = require("../models/models");

class RoleService {
  async create(name) {
    const candidate = await Role.findOne({ where: { name } });
    if (candidate) {
      throw ApiError.badRequest(`Role is already exist`);
    }
    const role = Role.create({ name });
    return role;
  }

  async getAllRoles() {
    const roles = await Role.findAll();
    return roles;
  }

  async deleteRole(id) {
    const role = await Role.findOne({ where: { id } });
    if (!role) {
      throw ApiError.badRequest(`Role not exist`);
    }
    await Role.destroy({ where: { id } });
    return [`Role ${role.name} deleted`, role];
  }
}

module.exports = new RoleService();
