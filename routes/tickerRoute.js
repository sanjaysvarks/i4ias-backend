const router = require('express').Router();
const controller = require('../controller/tickerController');
const middleware = require('../middleware/tokenValidation') 

router.post('/createTicker',
    middleware.token,
    controller.createTicker
)

router.post('/deleteTicker',
    middleware.token,
    controller.deleteTicker
)

router.post('/updateTicker',
    middleware.token,
    controller.updateTicker
)


module.exports = router;