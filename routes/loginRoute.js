const router = require('express').Router();
const controller = require('../controller/loginController');

//Get all boards with language
router.get('/login',
    controller.login);


module.exports = router;