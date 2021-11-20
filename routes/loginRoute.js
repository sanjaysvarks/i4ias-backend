const router = require('express').Router();
const controller = require('../controller/loginController');

//Get all boards with language
router.post('/login',
    controller.login);



module.exports = router;