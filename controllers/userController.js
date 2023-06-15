const { validationResult } = require('express-validator');
const ApiError = require('../exeptions/api-error');
const userService = require('../services/userService');

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.badRequest('Ошибка валидации', errors.array()));
			}

			const { email, password, role } = req.body;
			if (!email || !password) {
				return next(ApiError.badRequest('Uncorrect email or password'));
			}

			const userData = await userService.registration(email, role, password);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await userService.login(email, password);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async check(req, res, next) {
		const token = generateJwt(req.user.id, req.user.email, req.user.role);
		return res.json({ token });
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async setRole(req, res, next) {
		try {
			const { id, role } = req.body;
			const userData = await userService.setRole(id, role);
			return res.json(userData);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async setAvatarImage(req, res, next) {
		try {
			const { id } = req.body;
			const { img } = req.files;
			const user = await userService.setAvatarImage(id, img);
			return res.json(user);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers();
			return res.json(users);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}

	async deleteUser(req, res, next) {
		try {
			const { id } = req.params;
			const user = await userService.deleteUser(id);
			return res.json(user);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}
}

module.exports = new UserController();
