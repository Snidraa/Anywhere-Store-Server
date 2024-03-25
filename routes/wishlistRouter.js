const Router = require('express');
const router = new Router();
const wishlistController = require('../controllers/wishlistController');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/', wishlistController.addDevice);
router.get('/', wishlistController.getAllDevices);
router.delete('/', wishlistController.removeDevice);

module.exports = router;
