const router = require('express').Router();
const controller = require('../controller/studentRegistrationController');
const middleware = require('../middleware/tokenValidation') 

router.post('/createStudentRegistration',
    controller.createstudentRegistration
)

router.get('/excelSheetDataStuReg',
controller.excelSheetDataStuReg)

router.get('/getstudentRegistration',
controller.getstudentRegistration)

module.exports = router;