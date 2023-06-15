const Router = require('express');
const { body } = require('express-validator');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth-middleware');
const checkRole = require('../middlewares/check-role-middleware');

router.post(
	'/registration',
	body('email').isEmail(),
	body('password').isLength({ min: 3, max: 16 }),
	userController.registration,
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.put('/role', checkRole('ADMIN'), userController.setRole);
router.put('/avatar', userController.setAvatarImage);

router.get('/refresh', userController.refresh);
router.get('/', checkRole('ADMIN'), userController.getUsers);

router.get('/auth', authMiddleware, userController.check);

router.delete('/:id', checkRole('ADMIN'), userController.deleteUser);

module.exports = router;
