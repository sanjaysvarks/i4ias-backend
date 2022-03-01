const Joi = require('joi');
const validate = require('./commonValidate')


function createNewsPaper(req, res, next) {
    const schema = Joi.object({
        newsPaperName: Joi.string().required(),
        description: Joi.string(),
        content: Joi.string(),
        createdDate: Joi.date()
    })
    validate(schema.validate(req.body), res, next);
}

function updateNewspaper(req, res, next) {
    const schema = Joi.object({
        newsPaperId: Joi.number().required(),
        newsPaperName: Joi.string(),
        description: Joi.string(),
        content: Joi.string(),
        createdDate: Joi.date()
    })
    validate(schema.validate(req.body), res, next);
}

function deleteNewspaper(req, res, next) {
    const schema = Joi.object({
        newsPaperIds: Joi.array().items(Joi.number().integer())
    })
    validate(schema.validate(req.body), res, next);
}

module.exports =
{
    createNewsPaper,
    updateNewspaper,
    deleteNewspaper
}
