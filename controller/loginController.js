const response = require('../response')
const authService = require('../services/authServices')
const userRepo = require('../repositories/userRepo')

let login = async (req, res, next) => {
    try {
        const { phone, email, password } = req.body;
        let result = await userRepo.getUserByPhoneOrEmail(phone, email)

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
        console.log("error====>",error)
        response.error(res)
    }

}


async function changePassword(req, res, next) {
    const { currentPassWord, newPassWord, phone, email } = req.body
    let result = await userRepo.getUserByPhoneOrEmail(phone, email)
    if (result) {

        let newPassWordEncypted = authService.encyptPassword(newPassWord)

        if (authService.comparePassword(currentPassWord, result.password)) {
            let updateInfo = {
                password: newPassWordEncypted
            }
            let updateResult = userRepo.updateUser(result.id, updateInfo)
            if (updateResult)
                response.success(res, "Password changed successfully")
            else
                response.error(res);
        }
        else {
            response.errorValidation(res, "Current password not valid")
        }
    }
    else {
        response.errorNotFound(res, "User not found")
    }
}

module.exports = {
    login,
    changePassword

};

