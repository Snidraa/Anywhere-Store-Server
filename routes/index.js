const Router = require('express');
const router = new Router();
const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const basketRouter = require('./basketRouter');
const wishlistRouter = require('./wishlistRouter');
const reviewRouter = require('./reviewRouter');

router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/basket', basketRouter);
router.use('/wishlist', wishlistRouter);
router.use('/review', reviewRouter);

module.exports = router;
