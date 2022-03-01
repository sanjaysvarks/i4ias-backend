const router = require('express').Router();
const controller = require('../controller/newsPaperController');
const middleware = require('../middleware/tokenValidation') 
const newsPaperMiddleware = require('../middleware/newsPaperMiddleware')

router.post('/createNewsPaper',
    middleware.token,
    newsPaperMiddleware.createNewsPaper,
    controller.createNewsPaper
)

router.post('/updateNewspaper',
    middleware.token,
    newsPaperMiddleware.updateNewspaper,
    controller.updateNewspaper
)


router.post('/deleteNewsPaper',
    middleware.token,
    newsPaperMiddleware.deleteNewspaper,
    controller.deleteNewsPaper
)

router.get('/getNewsPaper',
    controller.getNewsPaper
)



module.exports = router;