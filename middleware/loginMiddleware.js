const Joi = require('joi');
const validate = require('./commonValidate')

function login(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().allow(null),
        phone: Joi.string().allow(null),
        password: Joi.string()
            .required(),
    }).xor('email', 'phone')
    validate(schema.validate(req.body), res, next);
}


function changePassword(req, res, next) {
    const schema = Joi.object({
        currentPassWord: Joi.string().required(),
        newPassWord: Joi.string().required(),
        email: Joi.string().allow(null),
        phone: Joi.string().allow(null),
    }).xor('email', 'phone')
    validate(schema.validate(req.body), res, next);
}



module.exports =
{
    login,
    changePassword
}