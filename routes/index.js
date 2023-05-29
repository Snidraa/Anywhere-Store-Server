const Router = require('express');
const router = new Router();
const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const basketRouter = require('./basketRouter');
const favoriteRouter = require('./favoriteRouter');
const ratingRouter = require('./ratingRouter');

router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/basket', basketRouter);
router.use('/favorite', favoriteRouter);
router.use('/rating', ratingRouter);

module.exports = router;
