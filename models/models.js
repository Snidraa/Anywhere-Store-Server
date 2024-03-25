const sequelize = require('../db');
const { DataTypes, BOOLEAN } = require('sequelize');

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	img: { type: DataTypes.STRING, defaultValue: null },
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
	count: { type: DataTypes.INTEGER },
});

const Wishlist = sequelize.define('wishlist', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const WishlistDevice = sequelize.define('wishlist_device', {
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

const Review = sequelize.define('review', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	rate: { type: DataTypes.INTEGER, allowNull: false },
	comment: { type: DataTypes.STRING, allowNull: false },
	confirmed: { type: BOOLEAN, defaultValue: false },
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

User.hasMany(Review);
Review.belongsTo(User);

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasOne(Wishlist);
Basket.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Wishlist.hasMany(WishlistDevice);
WishlistDevice.belongsTo(Wishlist);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Review);
Review.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(WishlistDevice);
WishlistDevice.belongsTo(Device);

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
	Wishlist,
	WishlistDevice,
	Device,
	Type,
	Brand,
	Review,
	TypeBrand,
	DeviceInfo,
};
