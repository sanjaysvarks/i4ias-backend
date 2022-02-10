const router = require('express').Router();
const controller = require('../controller/whatsNewController');
const middleware = require('../middleware/tokenValidation') 

router.post('/createWhatsNew',
    middleware.token,
    controller.createWhatsNew
)

router.post('/deleteWhatsNew',
    middleware.token,
    controller.deleteWhatsNew
)

router.post('/updateWhatsNew',
    middleware.token,
    controller.updateWhatsNew
)

router.get('/getWhatsNewById',
controller.getWhatsNewById)


module.exports = router;