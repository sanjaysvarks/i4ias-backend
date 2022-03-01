const response = require('../response')
const newsPaperRepo = require('../repositories/newsPaperRepo')


async function createNewsPaper(req, res, next) {
    try {
        let { newsPaperName, description, content, createdDate } = req.body
        const userId = req.headers.userId
        let newsPaperData = {
            newsPaperName: newsPaperName,
            description: description,
            content: content,
            createdDate: createdDate,
            userId: userId
        }

        let result = await newsPaperRepo.createNewsPaper(newsPaperData)
        if (result) {
            response.successPost(res, result, "NewsPaper");
        } else {
            response.error(res)
        }

    } catch (error) {
        response.error(res)
    }
}

async function updateNewspaper(req, res, next) {
    try {
        let { newsPaperId, newsPaperName, description, content, createdDate } = req.body
        const userId = req.headers.userId
        let updateInfo = {
            newsPaperName,
            description,
            content,
            createdDate,
            userId
        }

        let newsPaperWhereCaluse = {
            id: newsPaperId
        }

        let updateResult = await newsPaperRepo.updateNewsPaper(newsPaperWhereCaluse, updateInfo)
        if (updateResult) {
            response.success(res, "Updated NewsPaper successfully")
        }
        else {
            response.error(res);
        }
    } catch (error) {
        response.error(res)
    }

}

async function deleteNewsPaper(req, res, next) {
    try {
        const { newsPaperIds } = req.body
        let newsPaperWhereCaluse = {
            id: newsPaperIds
        }
        let result = await newsPaperRepo.deleteNewsPaper(newsPaperWhereCaluse)
        if (result) {
            response.success(res, "Deleted NewsPaper successfully")
        }
        else {
            response.error(res);
        }

    } catch (error) {
        response.error(res)
    }

}

async function getNewsPaper(req, res, next) {
    try {
        const newsPaperName = req.query.newsPaperName
        let newsPaperWhereCaluse = {
            newsPaperName: newsPaperName
        }
        let result = await newsPaperRepo.getNewsPaper(newsPaperWhereCaluse)
        if (result) {
            response.successGet(res, result, "NewsPaper");
        } else {
            response.errorNotFound(res, "NewsPaper");
        }
    } catch (error) {
        response.error(res)
    }
}


module.exports = {
    createNewsPaper,
    updateNewspaper,
    deleteNewsPaper,
    getNewsPaper
}