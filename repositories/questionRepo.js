const db = require('../models/index')
const user = db.user;
const categoryType = db.categoryType
const quiz = db.quiz
const question = db.questions
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize


async function createQuestion(questionData) {
    const result = await question.bulkCreate(questionData);
    return result;
}

async function updateQuestions(whereCondition, updateInfo) {
    const result = await question.update(updateInfo,
        {
            where : whereCondition,
            returning: true
        }
    )
    return result;
}

async function deleteQuestions(whereCondition) {
    const result = await question.destroy({
        where: whereCondition,
        returning: true
    })
    return result;
}

async function getQuestions(whereCondition) {

    const result = await question.findAll({
        where: whereCondition
    })

    return result;
}

module.exports = {
    createQuestion,
    updateQuestions,
    deleteQuestions,
    getQuestions
};