const ApiError = require("../exeptions/api-error");
const { Type } = require("../models/models");

class TypeService {
  async create(name) {
    const candidate = await Type.findOne({ where: { name } });
    if (candidate) {
      throw ApiError.badRequest(`Type "${name}" is already exist`);
    }
    const type = await Type.create({ name });
    return type;
  }

  async getAll() {
    const types = await Type.findAll();
    return types;
  }

  async deleteOne(id) {
    const type = await Type.findOne({ where: { id } });
    if (!type) {
      throw ApiError.badRequest(`Type not exist`);
    }
    await Type.destroy({ where: { id } });
    return type;
  }
}

module.exports = new TypeService();
