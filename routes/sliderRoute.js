
const router = require('express').Router();
const controller = require('../controller/sliderController');
const middleware = require('../middleware/tokenValidation') 

router.post('/createSlider',
    middleware.token,
    controller.createSlider
)

router.post('/deleteSlider',
    middleware.token,
    controller.deleteSlider
)

router.get('/getHomePageResponse',
    controller.getHomePageResponse
)

router.post('/updateSlider',
    middleware.token,
    controller.updateSlider
)



module.exports = router;