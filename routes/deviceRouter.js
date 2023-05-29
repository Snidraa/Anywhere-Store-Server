const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController');
const checkRole = require('../middlewares/check-role-middleware');

router.post('/', checkRole('ADMIN'), deviceController.create);

router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);

router.delete('/:id', checkRole('ADMIN'), deviceController.deleteOne);

module.exports = router;