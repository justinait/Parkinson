var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

const validationLogin = require ('../middlewares/validationLogin')
const validationRegister = require ('../middlewares/validationRegister')
const guestMiddleware = require ('../middlewares/guestMiddleware')
const authMiddleware = require ('../middlewares/authMiddleware')

router.get('/login', guestMiddleware, userController.login);
router.post('/login', guestMiddleware, validationLogin, userController.processLogin);

router.get('/register', guestMiddleware, userController.register);
router.post('/register', guestMiddleware, validationRegister, userController.processRegister);

router.get('/adminList', authMiddleware, userController.adminList);
router.get('/logout', authMiddleware, userController.logout);
router.get('/about', userController.curriculum);


module.exports = router;
 