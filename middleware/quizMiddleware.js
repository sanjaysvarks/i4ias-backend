const Joi = require('joi');
const validate = require('./commonValidate')

function createQuiz(req, res, next) {
    const schema = Joi.object({
        quizname: Joi.string().required(),
        quizdate: Joi.date().required()
    })
    validate(schema.validate(req.body), res, next);
}

function updateQuiz(req, res, next) {
    const schema = Joi.object({
        quizid: Joi.number().required(),
        quizname: Joi.string().required(),
        quizdate: Joi.date().required()
    })
    validate(schema.validate(req.body), res, next);
}

function deleteQuiz(req, res, next) {
    const schema = Joi.object({
        quizIds: Joi.array().items(Joi.number()).required()
    })
    validate(schema.validate(req.body), res, next);
}


module.exports = {
    createQuiz,
    updateQuiz,
    deleteQuiz
}