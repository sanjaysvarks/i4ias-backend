
const router = require('express').Router();
const controller = require('../controller/sliderController');
const middleware = require('../middleware/tokenValidation') 

router.post('/createSlider',
    middleware.token,
    controller.createSlider
)

router.post('/deleteSlider',
    controller.deleteSlider
)

router.get('/getHomePageResponse',
    controller.getHomePageResponse
)


module.exports = router;