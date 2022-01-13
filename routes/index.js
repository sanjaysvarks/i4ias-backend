const login = require('./loginRoute');
const user  = require('./userRoute');
const currentAffairs = require('./currentAffairsRoute')
const quiz = require('./quizRoute')
const quizQueOpt =require('./quizQueOptRoute')

module.exports = function (app) {
    app.use(login);
    app.use(user);
    app.use(currentAffairs);
    app.use(quiz);
    app.use(quizQueOpt);
}
