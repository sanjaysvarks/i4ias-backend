const Joi = require('joi');
const validate = require('./commonValidate')


function createCurrentAffairs(req, res, next) {
    const schema = Joi.object({
        description: Joi.string().required(),
        content: Joi.string().required(),
        tags: Joi.string().required(),
        categoryType: Joi.string().required(),
        userId: Joi.number().required(),
        currentAffairsDate: Joi.string().required()
    })
    validate(schema.validate(req.body), res, next);
}

function updateCurrentAffairsData(req, res, next) {
    const schema = Joi.object({
        description: Joi.string().required(),
        content: Joi.string().required(),
        tags: Joi.string().required(),
        categoryType: Joi.string().required(),
        userId: Joi.number().required(),
        currentAffairsDate: Joi.string().required()
    })
    validate(schema.validate(req.body), res, next);
}

function deleteCurrentAffairs(req, res, next) {
    const schema = Joi.object({
        currentAffairsIds: Joi.array().items(Joi.number().integer())
    })
    validate(schema.validate(req.body), res, next);
}


function getCurrentAffairsNavigation(req, res, next) {
    const schema = Joi.object({
        currentId: Joi.number().required(),
        action: Joi.string().required(),
    })
    validate(schema.validate(req.body), res, next);
}



module.exports =
{
    createCurrentAffairs,
    updateCurrentAffairsData,
    deleteCurrentAffairs,
    getCurrentAffairsNavigation
}

