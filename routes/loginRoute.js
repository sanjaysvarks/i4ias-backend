const router = require('express').Router();
const controller = require('../controller/loginController');


router.post('/login',
    controller.login);


router.post('/changepassword',
controller.changePassword);

module.exports = router;