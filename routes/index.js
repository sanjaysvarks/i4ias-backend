const login = require('./loginRoute');
const user  = require('./userRoute');
const currentAffairs = require('./currentAffairsRoute')
const quiz = require('./quizRoute')
const question =require('./questionRoute')
const slider = require('./sliderRoute')
const testimonial = require('./testimonialRoute')
const ticker = require('./tickerRoute')
const whatsNew = require('./whatsNewRoute')
const newsPaper = require('./newsPaperRoute')
const studentRegistration = require('./studentRegistrationRoute')
const subscriber = require('./subscribeRoute')

module.exports = function (app) {
    app.use(login);
    app.use(user);
    app.use(currentAffairs);
    app.use(quiz);
    app.use(question);
    app.use(slider);
    app.use(testimonial);
    app.use(ticker);
    app.use(whatsNew);
    app.use(newsPaper);
    app.use(studentRegistration);
    app.use(subscriber);
}
