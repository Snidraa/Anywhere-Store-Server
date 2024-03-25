const Router = require('express');
const router = new Router();
const reviewController = require('../controllers/reviewController');
const checkRole = require('../middlewares/check-role-middleware');

router.post('/', reviewController.addReview);
router.update('/', reviewController.confirmReview);

router.delete('/', reviewController.removeReview);

module.exports = router;
