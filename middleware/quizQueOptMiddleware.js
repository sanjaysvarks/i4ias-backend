const Joi = require('joi');
const validate = require('./commonValidate')


function createQuizQueOpt(req,res,next){
    const schema = Joi.object({
        categoryTypeId: Joi.number().required(),
        tags: Joi.string().required(),
        quizId: Joi.number().required(),
        questionContent: Joi.string().required(),
        answer:Joi.string().required(),
        solution :Joi.string().required(),
        optionList :Joi.array()
    })
    validate(schema.validate(req.body), res, next);  
}

function updateQuestions(req, res, next){
    const schema = Joi.object({
        id: Joi.number().required(),
        categoryTypeId: Joi.number().required(),
        tags: Joi.string().required(),
        quizId: Joi.number().required(),
        questionContent: Joi.string().required(),
        answer:Joi.string().required(),
        solution :Joi.string().required(),
        userId :Joi.number().required()
    })
    validate(schema.validate(req.body), res, next); 
}

function updateOptions(req, res, next){
    const schema = Joi.object({
        id: Joi.number().required(),
        quizId: Joi.number().required(),
        quizQuestionId: Joi.number().required(),
        optionContent: Joi.string().required(),
        seqno:Joi.number().required()
    })
    validate(schema.validate(req.body), res, next); 
}

function deleteQuestions(req, res, next) {
    const schema = Joi.object({
        questionIds: Joi.array().items(Joi.number().integer())
    })
    validate(schema.validate(req.body), res, next);
}

function deleteOptions(req, res, next) {
    const schema = Joi.object({
        optionIds: Joi.array().items(Joi.number().integer())
    })
    validate(schema.validate(req.body), res, next);
}
module.exports = {
    createQuizQueOpt,
    updateQuestions,
    updateOptions,
    deleteQuestions,
    deleteOptions
}