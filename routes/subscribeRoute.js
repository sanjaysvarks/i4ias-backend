const router = require('express').Router();
const controller = require('../controller/subscribeController');
const middleware = require('../middleware/tokenValidation') 

router.post('/createSubscriber',
//middleware.token,
controller.createSubscriber);

router.get('/getSubscriber',
controller.getSubscriber)



module.exports = router;