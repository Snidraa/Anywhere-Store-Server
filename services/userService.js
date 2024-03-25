const uuid = require('uuid');
const path = require('path');
const bcrypt = require('bcrypt');
const tokenService = require('./tokenService');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exeptions/api-error');
const { User, Basket, Role, Wishlist } = require('../models/models');

class UserService {
	async registration(email, role = 'USER', password) {
		const candidate = await User.findOne({ where: { email } });
		if (candidate) {
			throw ApiError.badRequest(`User with ${email} email is already exist`);
		}
		const hashPassword = await bcrypt.hash(password, 5);

		const userRole = await Role.findOne({ where: { name: role } });
		const user = await User.create({ email, password: hashPassword });
		await user.addRole(userRole);

		const basket = await Basket.create({ userId: user.id });
		const wishlist = await Wishlist.create({ userId: user.id });

		const userDto = new UserDto(user, [userRole.name]);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async login(email, password) {
		const user = await User.findOne({ where: { email }, include: Role });
		if (!user) {
			throw ApiError.badRequest('User not found');
		}
		const comparePassword = bcrypt.compareSync(password, user.password);
		if (!comparePassword) {
			throw ApiError.badRequest('Uncorrect password');
		}

		const userRoles = [];
		user.roles.map(role => userRoles.push(role.name));

		const userDto = new UserDto(user, userRoles);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}
		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await tokenService.findToken(refreshToken);
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}
		const user = await User.findOne({ where: { id: userData.id }, include: Role });
		const userRoles = [];
		user.roles.map(role => userRoles.push(role.name));

		const userDto = new UserDto(user, userRoles);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}

	async getAllUsers() {
		const users = await User.findAll();
		return users;
	}

	async deleteUser(id) {
		const candidate = await User.findOne({ where: { id } });
		if (!candidate) {
			throw ApiError.badRequest(`User not exist`);
		}
		await User.destroy({ where: { id } });
		await Basket.destroy({ where: { id } });

		return [`User with id: ${candidate.id} and email: ${candidate.email} deleted`, candidate];
	}

	async setRole(id, role) {
		const candidate = await User.findOne({ where: { id } });
		if (!candidate) {
			throw ApiError.badRequest('User not found');
		}
		const newRole = await Role.findOne({ where: { name: role } });
		if (!newRole) {
			throw ApiError.badRequest('Role not found, put correct role name or create new role');
		}
		await candidate.addRole(newRole);

		const user = await User.findOne({ where: { id }, include: Role });
		const userRoles = [];
		user.roles.map(role => userRoles.push(role.name));

		const userDto = new UserDto(user, userRoles);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async setAvatarImage(id, img) {
		let fileName = uuid.v4() + '.jpg';
		img.mv(path.resolve(__dirname, '..', 'static', 'avatar', fileName));

		const avatarImage = await User.update({ img: fileName }, { where: { id } });
		const user = await User.findOne({ where: { id } });
		return user;
	}
}

module.exports = new UserService();
