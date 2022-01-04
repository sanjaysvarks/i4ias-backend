const db = require('../models/index')
const quiz = db.quiz
const categoryType = db.categoryType
const user = db.user;
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize


async function createQuiz(quizData) {
    const result = await quiz.create(quizData);
    return result;
}

async function getQuizData(limit, offset) {
    const result = await quiz.findAndCountAll({
        order:
            [['createdAt', 'DESC']],
        limit: limit,
        offset: offset
    })
    return result
}

async function updateQuizData(quizId, updateInfo) {
    const result = quiz.update(updateInfo,
        {
            where: { id: quizId },
            returning: true
        }
    );

    return result;
}

async function deleteQuizData(quizIds) {
    const result = quiz.destroy({
        where: {
            id: quizIds
        },
        returning: true
    })
    return result;
}

module.exports = {
    createQuiz,
    getQuizData,
    updateQuizData,
    deleteQuizData
}