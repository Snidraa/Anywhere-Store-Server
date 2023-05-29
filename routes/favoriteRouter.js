const Router = require('express');
const router = new Router();
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/', favoriteController.addDevice);
router.get('/', favoriteController.getAllDevices);
router.delete('/', favoriteController.removeDevice);

module.exports = router;
