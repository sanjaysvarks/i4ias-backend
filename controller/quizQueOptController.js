const response = require('../response')
const quizQueOptRepo = require('../repositories/quizQueOptRepo')
const db = require('../models/index')
// const Op = db.Sequelize.Op
// const Sequelize = db.Sequelize

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
            for (let opt of optionList) {
                opt.quizQuestionId = questionResult.id,
                    opt.quizId = quizId
            }
            let optionResult = await quizQueOptRepo.createQuizOption(optionList)

            if (optionResult) {
                let returnResponse = questionResult.toJSON();
                returnResponse.Options = optionResult;
                response.successPost(res, returnResponse, "Quiz Question and Options ");
            }
            else {
                await quizQueOptRepo.deleteQuestionById(questionResult.id)
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
    let result = await quizQueOptRepo.getQuestionAndOptData({ quizId })
    if (result) {
        response.successGet(res, result, "Question and Option");
    } else {
        response.errorNotFound(res, "Question and Option");
    }
}

async function updateQuestions(req, res, next) {
    try {
        const { id, categoryTypeId, tags, quizId, questionContent, answer, solution, userId } = req.body
        let updateInfo = {
            categoryTypeId,
            tags,
            quizId,
            questionContent,
            answer,
            solution,
            userId
        }

        let updateResult = await quizQueOptRepo.updateQuestions(id, updateInfo)
        if (updateResult) {
            response.success(res, "Updated Question successfully")
        }
        else {
            response.errorNotFound(res, "Question");
        }

    } catch (error) {
        response.error(res);

    }
}

async function updateOptions(req, res, next) {
    try {
        const { id, quizId, quizQuestionId, optionContent, seqno } = req.body
        let updateInfo = {
            quizId,
            quizQuestionId,
            optionContent,
            seqno
        }
        let updateResult = await quizQueOptRepo.updateOptions(id, updateInfo)
        if (updateResult) {
            response.success(res, "Updated Options successfully")
        }
        else {
            response.errorNotFound(res, "Options");
        }

    } catch (error) {
        response.error(res);

    }
}

async function deleteQuestions(req, res, next ){
try {
    const ids = req.body.questionIds

    let optionResult = await  quizQueOptRepo.getOptions({quizQuestionId : ids})
    if (optionResult) {
        await quizQueOptRepo.deleteOptions({quizQuestionId : ids})
        await quizQueOptRepo.deleteQuestions({id : ids})
        

        response.success(res, "Deleted Questions and Options successfully")
    }
    else {
        await quizQueOptRepo.deleteQuestions({id : ids})
        response.success(res, "Deleted Questions successfully")
    }
    
} catch (error) {
    response.error(res);
}
}

async function deleteOptions(req,res,next){
    try {
        const ids = req.body.optionIds
        let optionResult = await quizQueOptRepo.deleteOptions({id : ids})
        if(optionResult){
            response.success(res, "Deleted Options successfully")
        }
        else{
            response.error(res),"Deleted Options Unsuccessfully ";
        }
    } catch (error) {
        response.error(res);
    }
}



module.exports = {
    createQuizQueOpt,
    getQuestionAndOpt,
    updateQuestions,
    updateOptions,
    deleteQuestions,
    deleteOptions
}