const router = require('express').Router();
const controller = require('../controller/loginController');
const loginMiddleware = require('../middleware/loginMiddleware');

router.post('/login',
   loginMiddleware.login,
    controller.login);


router.post('/changepassword',
    controller.changePassword);

module.exports = router;