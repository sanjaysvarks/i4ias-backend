const router = require('express').Router();
const controller = require('../controller/quizQueOptController')
const middleware = require('../middleware/tokenValidation') 
const quizQueOptMiddleware = require('../middleware/quizQueOptMiddleware')

router.post('/createQuizQueOpt',
middleware.token,
quizQueOptMiddleware.createQuizQueOpt,
controller.createQuizQueOpt);


router.get('/getQuestionAndOpt',
//middleware.token,
//quizQueOptMiddleware.,
controller.getQuestionAndOpt);

router.post('/updateQuestions',
middleware.token,
quizQueOptMiddleware.updateQuestions,
controller.updateQuestions
)

router.post('/updateOptions',
middleware.token,
quizQueOptMiddleware.updateOptions,
controller.updateOptions
)

router.post('/deleteQuestions',
middleware.token,
quizQueOptMiddleware.deleteQuestions,
controller.deleteQuestions
)

router.post('/deleteOptions',
middleware.token,
quizQueOptMiddleware.deleteOptions,
controller.deleteOptions
)


module.exports = router;