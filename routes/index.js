const login = require('./loginRoute');
const user  = require('./userRoute');
const currentAffairs = require('./currentAffairsRoute')

module.exports = function (app) {
    app.use(login);
    app.use(user);
    app.use(currentAffairs);
}
