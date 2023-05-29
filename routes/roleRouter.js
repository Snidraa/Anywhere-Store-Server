const Router = require('express');
const router = new Router();
const roleController = require('../controllers/roleController');
const checkRole = require('../middlewares/check-role-middleware');

router.post('/', checkRole('ADMIN'), roleController.createRole);
router.get('/', checkRole('ADMIN'), roleController.getRoles);
router.delete('/:id', checkRole('ADMIN'), roleController.deleteRole);

module.exports = router;
