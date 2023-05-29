const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/', basketController.addDevice);
router.get('/', basketController.getAllDevices);
router.delete('/', basketController.removeDevice);

module.exports = router;
