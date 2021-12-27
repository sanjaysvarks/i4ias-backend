const response = require('../response')
const currentAffairsRepo = require('../repositories/currentAffairsRepo')

async function createCurrentAffairs(req, res, next) {
    try {
        const { content, tags, userId, description, categoryType, currentAffairsDate } = req.body
        let currentAffairs = {
            description,
            content,
            tags,
            categoryType,
            userId,
            currentAffairsDate
        }

        let createCurrentAffairsData = await currentAffairsRepo.createCurrentAffairs(currentAffairs)

        if (createCurrentAffairsData) {

            response.successPost(res, createCurrentAffairsData, "Current Affairs");
        }
        else {
            response.error(res)
        }
    } catch (error) {
        response.error(res)
    }

}


async function getCurrentAffairsById(req, res, next) {
    const id = req.query.id
    let result = await currentAffairsRepo.getCurrentAffairsDataById(id)
    if (result) {
        response.successGet(res, result, "Current Affairs");
    } else {
        response.errorNotFound(res, "Current Affairs");
    }
}
async function getCurrentAffairs(req, res, next) {
    let categoryType = req.body.categoryType || 'CA';
    let { limit, pageNo } = req.body;
    let whereCondition = {
        categoryType
    };
    let result = await currentAffairsRepo.getCurrentAffairsData(whereCondition, limit, limit * pageNo);
    if (result) {
        response.successGet(res, result, "Current Affairs");
    } else {
        response.errorNotFound(res, "Current Affairs");
    }
}

async function updateCurrentAffairs(req, res, next) {

    const { id, content, tags, userId, description, categoryType, currentAffairsDate } = req.body
    let updateInfo = {
        description,
        content,
        tags,
        categoryType,
        userId,
        currentAffairsDate
    }
    let updateResult = await currentAffairsRepo.updateCurrentAffairsData(id, updateInfo)
    if (updateResult) {
        response.success(res, "Updated Current affairs successfully")
    }
    else {
        response.error(res);
    }
}


async function deleteCurrentAffairs(req, res, next) {
    const ids = req.body.currentAffairsIds
    let result = currentAffairsRepo.deleteCurrentAffairsData(ids)
    if (result) {
        response.success(res, "Deleted Current affairs successfully")
    }
    else {
        response.error(res);
    }
}

async function getCategoryType(req, res, next) {

    let result = await currentAffairsRepo.getCategoryTypeData()
    if (result) {
        response.successGet(res, result, "CategoryType");
    } else {
        response.errorNotFound(res, "Category Type");
    }
}

module.exports = {
    createCurrentAffairs,
    getCurrentAffairs,
    getCurrentAffairsById,
    updateCurrentAffairs,
    deleteCurrentAffairs,
    getCategoryType
}