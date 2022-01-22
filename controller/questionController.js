const response = require('../response')
const questionRepo = require('../repositories/questionRepo')
const db = require('../models/index')
// const Op = db.Sequelize.Op
// const Sequelize = db.Sequelize

async function createQuestion(req, res, next) {
    try {
        const { categoryTypeId, tags, quizId, questionContent, optionA, optionB, optionC, optionD, answer, ansDescription } = req.body
        const userId = req.headers.userId

        let questionData = {
            categoryTypeId: categoryTypeId,
            tags: tags,
            quizId: quizId,
            questionContent: questionContent,
            optionA: optionA,
            optionB: optionB,
            optionC: optionC,
            optionD: optionD,
            answer: answer,
            ansDescription: ansDescription,
            userId: userId
        }

        let questionResult = await questionRepo.createQuestion(questionData)
       
        if (questionResult) {
            response.successPost(res, questionResult, "Questions and Options ");
        }
        else {
            response.error(res, 'Question and Oprions Not Created Please Check the Data! ')
        }
    } catch (error) {
        response.error(res)
    }
}

async function getQuestion(req, res, next) {
    const quizId = req.query.quizId
    let questionRes = {
        quizId: quizId
    }
    let result = await questionRepo.getQuestions(questionRes)
    if (result) {
        response.successGet(res, result, "Question and Option");
    } else {
        response.errorNotFound(res, "Question and Option");
    }
}

async function updateQuestions(req, res, next) {
    try {
        const { id, categoryTypeId, tags, quizId, questionContent, optionA, optionB, optionC, optionD, answer, ansDescription } = req.body
        const userId = req.headers.userId
        let questionData = {
            categoryTypeId: categoryTypeId,
            tags: tags,
            quizId: quizId,
            questionContent: questionContent,
            optionA: optionA,
            optionB: optionB,
            optionC: optionC,
            optionD: optionD,
            answer: answer,
            ansDescription: ansDescription,
            userId: userId
        }
        let questionId = {
            id: id
        }

        let updateResult = await questionRepo.updateQuestions(questionId, questionData)
        if (updateResult) {
            response.success(res, "Updated Question successfully")
        }
        else {
            response.errorNotFound(res, "Question");
        }

    } catch (error) {
        response.error(res)
    }
}

async function deleteQuestions(req, res, next) {
    try {
        const ids = req.body.questionIds
        let result = await questionRepo.deleteQuestions({ id: ids })
        if (result) {
            response.success(res, "Deleted Questions and Options successfully")
        }
        else {
            response.success(res, "Deleted Questions successfully")
        }

    } catch (error) {
        response.error(res);
    }
}




module.exports = {
    createQuestion,
    getQuestion,
    updateQuestions,
    deleteQuestions
}
   