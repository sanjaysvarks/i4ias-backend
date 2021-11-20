const response = require('../response')
const db = require('../models/index')
const User = db.user
const Op = db.Sequelize.Op
const authService = require('../services/authServices')


let login = (req, res, next) => {
    try {
        const { phone, email, password } = req.body

        var condition =
        {
            [Op.or]: [
                {
                    phone: {
                        [Op.eq]: phone
                    },
                },
                {
                    email: {
                        [Op.eq]: email
                    }
                }
            ]
        }
        User.findOne({
            where: condition
        }).then((result) => {
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
        })

    } catch (error) {
        console.log('error', error)
        response.error(res)
    }

}



module.exports = {
    login

};

