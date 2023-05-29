const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRole = require('../middlewares/check-role-middleware');

router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);
router.delete('/:id', checkRole('ADMIN'), typeController.deleteOne);

module.exports = router;
