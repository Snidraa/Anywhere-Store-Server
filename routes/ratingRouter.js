const Router = require('express');
const router = new Router();
const ratingController = require('../controllers/ratingController');
const checkRole = require('../middlewares/check-role-middleware');

router.post('/', ratingController.rate);

router.delete('/', ratingController.unrate);

module.exports = router;
