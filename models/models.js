const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
});

const Role = sequelize.define('role', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true },
});

const UserRole = sequelize.define('user_role', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Token = sequelize.define('token', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	refreshToken: { type: DataTypes.STRING },
});

const Basket = sequelize.define('basket', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketDevice = sequelize.define('basket_device', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Favorite = sequelize.define('favorite', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const FavoriteDevice = sequelize.define('favorite_device', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Device = sequelize.define('device', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
	rating: { type: DataTypes.FLOAT, defaultValue: 0 },
	ratesCount: { type: DataTypes.INTEGER, defaultValue: 0 },
	img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define('type', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define('brand', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define('rating', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	rate: { type: DataTypes.INTEGER, allowNull: false },
});

const DeviceInfo = sequelize.define('device_info', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
});

const TypeBrand = sequelize.define('type_brand', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Token);
Token.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasOne(Favorite);
Basket.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Favorite.hasMany(FavoriteDevice);
FavoriteDevice.belongsTo(Favorite);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(FavoriteDevice);
FavoriteDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: 'info' });
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

module.exports = {
	User,
	Role,
	UserRole,
	Token,
	Basket,
	BasketDevice,
	Favorite,
	FavoriteDevice,
	Device,
	Type,
	Brand,
	Rating,
	TypeBrand,
	DeviceInfo,
};
