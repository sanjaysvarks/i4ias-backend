const router = require('express').Router();
const controller = require('../controller/questionController')
const middleware = require('../middleware/tokenValidation') 
const questionMiddleware = require('../middleware/questionMiddleware')

router.post('/createQuestion',
middleware.token,
//questionMiddleware.createQuestion,
controller.createQuestion);


router.get('/getQuestion',
//middleware.token,
//questionMiddleware.,
controller.getQuestion);

router.post('/updateQuestions',
//middleware.token,
//questionMiddleware.updateQuestions,
controller.updateQuestions
)

router.post('/deleteQuestions',
//middleware.token,
//questionMiddleware.deleteQuestions,
controller.deleteQuestions
)

module.exports = router;