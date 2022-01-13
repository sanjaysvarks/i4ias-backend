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
    return result;
}

async function createQuizOption(quizOptionData) {
    const result = await quizOptions.bulkCreate(quizOptionData);
    return result;
}

async function deleteQuestionByIdData(questionId) {
    const result = quizQuestion.destroy({ where: { id: questionId }, returning: true })
    return result;
}

async function getQuestionAndOptData(whereCondition) {
    let result = await quizQuestion.findAll({
        where : whereCondition, 
        include: [{
            model: quizOptions,
            as: 'Options',
            order:   ['seqno', 'asc'  ]   
        }]
       

    })
    return result;
}



module.exports = {
    createQuizQuestion,
    createQuizOption,
    deleteQuestionByIdData,
    getQuestionAndOptData

};