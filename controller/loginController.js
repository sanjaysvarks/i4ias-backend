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
        console.log('condition' ,condition)
        User.findOne({
            where: condition
        }).then((result) => {
            console.log('result' ,result)
            if (result) {
                let matched = authService.comparePassword(password, result.password)
                if (matched) {
                    result.password = undefined
                    response.success(res, result, "Login Success")
                }
                response.error(res, "Invalid credentials")
            }
            response.error(res, "Invalid credentials")
        })

    } catch (error) {
        console.log('error' ,error)
        response.error(res, "Invalid credentials")
    }

}





module.exports = {
    login

};

