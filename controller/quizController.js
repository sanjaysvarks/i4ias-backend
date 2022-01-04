const response = require('../response')
const quizRepo = require('../repositories/quizRepo')
const db = require('../models/index')
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

async function createQuiz(req, res, next) {
    try {
        const quiz = req.body.quizname

        let quizName = {
            quizName: quiz
        }
        let quizData = await quizRepo.createQuiz(quizName)
        if (quizData) {
            response.successPost(res, quizData, "Quiz");
        }
        else {
            response.error(res)
        }

    } catch (error) {
        response.error(res)
    }
}

async function getQuiz(req, res, next) {
    try {
        let { limit, offset } = req.body;

        let result = await quizRepo.getQuizData(limit, offset);
        if (result) {
            response.successGet(res, result, "Quiz");
        } else {
            response.errorNotFound(res, "Quiz");
        }
    } catch (error) {
        response.error(res)
    }
}

async function updateQuiz(req, res, next) {
    try {
        const quizId = req.body.quizid
        const quiz = req.body.quizname

        let updateInfo = {
            quizName: quiz
        }
        let updateResult = await quizRepo.updateQuizData(quizId, updateInfo)
        if (updateResult) {
            response.success(res, "Updated Quiz successfully")
        }
        else {
            response.error(res);
        }
    } catch (error) {
        response.error(res)
    }
}

async function deleteQuiz(req, res, next) {
    try {
        const ids = req.body.quizIds
        let result = quizRepo.deleteQuizData(ids)
        if (result) {
            response.success(res, "Deleted Quiz successfully")
        }
        else {
            response.error(res);
        }
    } catch (error) {
        response.error(res)
    }
}


module.exports = {
    createQuiz,
    getQuiz,
    updateQuiz,
    deleteQuiz
}