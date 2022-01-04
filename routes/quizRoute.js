const router = require('express').Router();
const controller = require('../controller/quizController')
const middleware = require('../middleware/tokenValidation') 
const quizMiddleware = require('../middleware/quizMiddleware')

router.post('/createquiz',
middleware.token,
quizMiddleware.createQuiz,
controller.createQuiz);

router.post('/getquiz',
//middleware.token,
//quizMiddleware.createQuiz,
controller.getQuiz);

router.post('/updatequiz',
middleware.token,
quizMiddleware.updateQuiz,
controller.updateQuiz);


router.post('/deletequiz',
middleware.token,
quizMiddleware.deleteQuiz,
controller.deleteQuiz);


module.exports = router;