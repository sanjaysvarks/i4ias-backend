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

async function getQuizData() {
    const result = await quiz.findAndCountAll({
        order:
            [['createdAt', 'DESC']],
            include: [
                {
                    model: user,
                    attributes: ['fname', 'lname', 'updated_at'],
                    as: 'user'
                }
            ]  
       // limit: limit,
        //offset: offset
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

async function getQuizByNamerId(quizname, quizid) {

    var condition =
    {
        [Op.or]: [
            {
                quizName: {
                    [Op.eq]: quizname
                },
            },
            {
                id: {
                    [Op.eq]: quizid
                }
            }
        ]
    }
    const result = await quiz.findOne({
        where: condition
    })
    return result;
}


module.exports = {
    createQuiz,
    getQuizData,
    updateQuizData,
    deleteQuizData,
    getQuizByNamerId
}
