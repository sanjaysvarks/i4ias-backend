const login = require('./loginRoute');
const user  = require('./userRoute');

module.exports = function (app) {
    app.use(login);
    app.use(user);

}
