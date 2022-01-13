const response = require('../response')
const quizQueOptRepo = require('../repositories/quizQueOptRepo')
const db = require('../models/index')
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

async function createQuizQueOpt(req, res, next) {
    try {

        const { categoryTypeId, tags, quizId, questionContent, answer, solution } = req.body
        const userId = req.headers.userId
        const { optionList } = req.body
        let quizQuestionData = {
            categoryTypeId: categoryTypeId,
            tags: tags,
            quizId: quizId,
            questionContent: questionContent,
            answer: answer,
            solution: solution,
            userId: userId
        }

        let questionResult = await quizQueOptRepo.createQuizQuestion(quizQuestionData)
        if (questionResult) {
            const quesOptList = [questionResult]
            for (let opt of optionList) {
                opt.quizQuestionId = questionResult.id,
                    opt.quizId = quizId
            }

            let optionResult = await quizQueOptRepo.createQuizOption(optionList)

            if (optionResult) {
                quesOptList.push({
                    optionResult
                })
                response.successPost(res, quesOptList, "Quiz Question and Options ");
            }
            else {
                let delteQuestion = await quizQueOptRepo.deleteQuestionByIdData(questionResult.id)
                response.error(res, 'Question Options Not Created Please Check the Data! ')
            }
        }
        else {
            response.error(res, 'Question Not Created Please Check the Data! ')
        }
    } catch (error) {
        response.error(res)
    }
}

async function getQuestionAndOpt(req, res, next) {
         const quizId = req.query.quizId
        let result = await quizQueOptRepo.getQuestionAndOptData({quizId})
        if (result) {
            response.successGet(res, result, "Question and Option");
        } else {
            response.errorNotFound(res, "Question and Option");
        }

   

}


module.exports = {
    createQuizQueOpt,
    getQuestionAndOpt
}