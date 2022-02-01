
const router = require('express').Router();
const controller = require('../controller/sliderController');

router.post('/createSlider',
    controller.createSlider
)

module.exports = router;