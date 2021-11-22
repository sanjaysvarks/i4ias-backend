const response = require('../response')
const db = require('../models/index')
const User = db.user
const Op = db.Sequelize.Op
const authService = require('../services/authServices')
const loginrepo = require('../repositories/loginRepo')


let login = async  (req, res, next) => {
    try {
        const { phone, email, password } = req.body

        let result = await loginrepo.getUserByPhoneOrEmail(phone, email)
       
        if (result) {
            let matched = authService.comparePassword(password, result.password)
            if (matched) {
                result.password = undefined
                let userJson = result.toJSON();
                let token = authService.generateToken(userJson)
                userJson.token = token
                response.success(res, userJson, "Login Success")
            }
            else {
                response.error(res, "Invalid credentials")
            }
        }
        else {
            response.error(res, "Invalid credentials")
        }
    } catch (error) {
        console.log('error', error)
        response.error(res)
    }

}

module.exports = {
    login

};

