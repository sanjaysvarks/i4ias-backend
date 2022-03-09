const router = require('express').Router();
const controller = require('../controller/userController');
const middleware = require('../middleware/tokenValidation') 

//Get all boards with language
//router.get('/user',
 //   middleware.token,
 //   controller.getUser);

router.post('/createUser',
//middleware.token,
controller.createUser);

router.post('/getuser',
controller.getUser)

router.post('/createScholarship',
controller.createScholarship)

router.get('/getScholarship',
controller.getScholarship)

router.get('/excelSheetData',
controller.excelSheetData)

module.exports = router;