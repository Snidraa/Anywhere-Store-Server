const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');
const checkRole = require('../middlewares/check-role-middleware');

router.post('/', checkRole('ADMIN'), brandController.create);
router.get('/', brandController.getAll);
router.delete('/:id', checkRole('ADMIN'), brandController.deleteOne);

module.exports = router;
