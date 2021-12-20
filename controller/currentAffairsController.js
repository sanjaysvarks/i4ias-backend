const response = require('../response')
const currentAffairsRepo = require('../repositories/currentAffairsRepo')
const userRepo = require('../repositories/userRepo')


async function createCurrentAffairs(req, res, next) {
    try {
        const { content, tags, userId, description,caType } = req.body
        let currentAffairs = {
            content,
            tags,
            userId,
            description,
            caType
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
        response.successGet(res, result, "currentAffairs");
    } else {
        response.errorNotFound(res, "Current Affairs");
    }
}
async function getCurrentAffairs(req, res, next) {
    let result = await currentAffairsRepo.getCurrentAffairsData()
    if (result) {
        response.successGet(res, result, "currentAffairs");
    } else {
        response.errorNotFound(res, "Current Affairs");
    }
}

async function updateCurrentAffairs(req, res, next) {

    const { id, description, content, tags,caType } = req.body
    let updateInfo = {
        description,
        content,
        tags,
        caType
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

module.exports = {
    createCurrentAffairs,
    getCurrentAffairs,
    getCurrentAffairsById,
    updateCurrentAffairs,
    deleteCurrentAffairs
}