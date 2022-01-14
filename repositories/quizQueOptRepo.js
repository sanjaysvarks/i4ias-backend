const db = require('../models/index')
const user = db.user;
const categoryType = db.categoryType
const quiz = db.quiz
const quizQuestion = db.quizQuestion
const quizOptions = db.quizOptions
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize


async function createQuizQuestion(quizQuestionData) {
    const result = await quizQuestion.create(quizQuestionData);
    console.log('createQuizQuestion ', result)
    return result;

}

async function createQuizOption(quizOptionData) {
    const result = await quizOptions.bulkCreate(quizOptionData);
    return result;
}

async function deleteQuestionById(questionId) {
    const result = quizQuestion.destroy({ where: { id: questionId }, returning: true })
    return result;
}

async function getQuestionAndOptData(whereCondition) {
    let result = await quizQuestion.findAll({
        where: whereCondition,
        include: [{
            model: quizOptions,
            as: 'Options',
            order: ['seqno', 'ASC']
        }]
    })
    return result;
}

async function updateQuestions(questionId, updateInfo) {
    const result = await quizQuestion.update(updateInfo,
        {
            where: { id: questionId },
            returning: true
        }
    )
    return result;
}

async function updateOptions(optionId, updateInfo) {
    const result = await quizOptions.update(updateInfo,
        {
            where: { id: optionId },
            returning: true
        }
    )
    return result;
}

async function deleteQuestions(whereCondition) {
    const result = await quizQuestion.destroy({
        where: whereCondition,
        returning: true
    })
    return result;
}

async function deleteOptions(whereCondition) {
    const result = await quizOptions.destroy({
        where: whereCondition,
        returning: true
    })
    return result;
}

async function getOptions(whereCondition) {
    const result = await quizOptions.findAll({
        where:whereCondition
    })
    return result;
}

async function getQuestions(whereCondition) {
    const result = await quizOptions.findAll({
        where:whereCondition
    })
    return result;
}


module.exports = {
    createQuizQuestion,
    createQuizOption,
    deleteQuestionById,
    getQuestionAndOptData,
    updateQuestions,
    updateOptions,
    deleteQuestions,
    deleteOptions,
    getOptions,
    getQuestions
};