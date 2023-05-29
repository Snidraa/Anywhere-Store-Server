module.exports = class UserDto {
	id;
	email;
	roles;

	constructor(model, roles) {
		this.id = model.id;
		this.email = model.email;
		this.roles = [...roles];
	}
};
