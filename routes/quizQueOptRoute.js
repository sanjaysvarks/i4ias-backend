const router = require('express').Router();
const controller = require('../controller/quizQueOptController')
const middleware = require('../middleware/tokenValidation') 
const quizQueOptMiddleware = require('../middleware/quizQueOptMiddleware')

router.post('/createQuizQueOpt',
middleware.token,
//quizQueOptMiddleware.,
controller.createQuizQueOpt);


router.get('/getQuestionAndOpt',
//middleware.token,
//quizQueOptMiddleware.,
controller.getQuestionAndOpt);

module.exports = router;