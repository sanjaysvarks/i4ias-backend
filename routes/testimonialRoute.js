const router = require('express').Router();
const controller = require('../controller/testimonialController');
const middleware = require('../middleware/tokenValidation') 

router.post('/createTestimonial',
    middleware.token,
    controller.createTestimonial
)

router.post('/deleteTestimonial',
    middleware.token,
    controller.deleteTestimonial
)

router.post('/updateTestimonial',
    middleware.token,
    controller.updateTestimonial
)


module.exports = router;