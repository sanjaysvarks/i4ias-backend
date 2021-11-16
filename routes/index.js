const login = require('./loginRoute');

module.exports = function (app) {
    app.use(login);
}
