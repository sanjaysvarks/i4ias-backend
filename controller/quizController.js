const response = require('../response')
const quizRepo = require('../repositories/quizRepo')
const quizQueOptRepo = require('../repositories/quizQueOptRepo')
const db = require('../models/index')
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

async function createQuiz(req, res, next) {
    try {
        const quiz = req.body.quizname
        const quizdate = req.body.quizdate
        const userid = req.headers.userId
        let quizName = {
            quizName: quiz,
            userId: userid,
            quizDate: quizdate
        }
        let result = await quizRepo.getQuizByNamerId(quiz)
        if (result) {
            response.errorValidation(res, "Quiz Name is already Exist! ")
        }
        else {
            let quizData = await quizRepo.createQuiz(quizName)
            if (quizData) {
                response.successPost(res, quizData, "Quiz");
            }
            else {
                response.error(res)
            }
        }
    } catch (error) {
        response.error(res)
    }
}

async function getQuiz(req, res, next) {
    try {
       // let { limit, offset } = req.body;

        let result = await quizRepo.getQuizData();
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
        const quizdate = req.body.quizdate
        const userid = req.headers.userId
        let updateInfo = {
            quizName: quiz,
            quizDate: quizdate,
            userId : userid
        }
        let result = await quizRepo.getQuizByNamerId(null,quizId)
        if (result) {

            let quizresult = await quizRepo.getQuizByNamerId(quiz,null)
            if (quizresult) {
                response.errorValidation(res, "Quiz Name already Exist, Try with a different name! ")
            }
            else {
                let updateResult = await quizRepo.updateQuizData(quizId, updateInfo)
                if (updateResult) {
                    response.success(res, "Updated Quiz successfully")
                }
                else {
                    response.error(res);
                }

            }
        }
        else {
            response.error(res,'Quiz id Not Exist!');
        }

    } catch (error) {
        response.error(res)
    }
}

async function deleteQuiz(req, res, next) {
    try {
        const ids = req.body.quizIds
        await quizQueOptRepo.deleteOptions({quizId : ids})
        await quizQueOptRepo.deleteQuestions({quizId : ids})
        let result = await quizRepo.deleteQuizData(ids)
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