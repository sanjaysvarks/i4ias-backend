const response = require('../response')
const newsPaperRepo = require('../repositories/newsPaperRepo')
const db = require('../models/index')
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

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
        let genOrder = [
            ['id', 'DESC']
        ]

        let result = await newsPaperRepo.getNewsPaper(newsPaperWhereCaluse, genOrder)
        if (result) {
            response.successGet(res, result, "NewsPaper");
        } else {
            response.errorNotFound(res, "NewsPaper");
        }
    } catch (error) {
        response.error(res)
    }
}


async function getNewPaperDataBWtwodates(req, res, next) {
    try {
        const { fromDate, toDate, newsPaper } = req.body;

        let fromdate = Sequelize.where(
            Sequelize.literal('DATE_FORMAT(createdDate, "%d-%b-%Y")'),
            { [Op.gte]: fromDate }
        )
         
      
        let todate = Sequelize.where(
            Sequelize.literal('DATE_FORMAT(createdDate, "%d-%b-%Y")'),
            { [Op.lte]: toDate }
        )

        let newspaper = Sequelize.where(
            Sequelize.literal('newsPaperName'),
            { [Op.eq]: newsPaper }
        )
       

        let whereCondition = {
            fromdate,
            todate,
            newspaper
        }
        console.log("whereCondition-->",whereCondition)
        let genOrder = [
            ['id', 'ASC']
        ]

        let result = await newsPaperRepo.getNewsPaper(whereCondition, genOrder)
        if (result) {
            response.successGet(res, result, "Current Affairs");
        } else {
            response.error(res, "Current Affairs");
        }
    } catch (error) {
        response.error(res)
    }

}


async function getNewsPaperNavigation(req, res, next) {
    try {
        const { newsPaperId, action, newsPaperName } = req.body
        let whereCondition = null;
        let order = null;
        if (action == 'next') {
            console.log('action ', action)
            whereCondition = {
                id: { [Op.gt]: newsPaperId }
            }
            order = [
                ['id', 'ASC'],
            ]
        }
        else {
            whereCondition = {
                id: { [Op.lt]: newsPaperId }
            }
            order = [
                ['id', 'DESC'],
            ]
        }

        if (newsPaperName && newsPaperName != "") {
            whereCondition.newsPaperName = {
                [Op.eq]: newsPaperName
            }
        }

        let result = await newsPaperRepo.getNewsPaperByCondition(whereCondition, order)

        if (result) {
            response.successGet(res, result, "Current Affairs");
        } else {
            response.errorNotFound(res, "Current Affairs");
        }
    } catch (error) {
        response.error(res)
    }
}

async function getNewsPaperNavigationByDate(req, res, next) {
    const { createdDate, newsPaperName, action } = req.body
    let whereCondition = null;
    let order = null;
    if (action == 'next') {
        console.log('action ', action)
        let where = Sequelize.where(
            Sequelize.literal('DATE_FORMAT(createdDate, "%d-%b-%Y")'),
            { [Op.gt]: createdDate }
        )

        whereCondition = {
            where,
            newsPaperName: newsPaperName
        }
        order = [
            ['createdDate', 'ASC'],
        ]
    }
    else {

        let where = Sequelize.where(
            Sequelize.literal('DATE_FORMAT(createdDate, "%d-%b-%Y")'),
            { [Op.lt]: createdDate }
        )

        whereCondition = {
            where,
            newsPaperName: newsPaperName
        }
        order = [
            ['createdDate', 'DESC'],
        ]
    }

    let result = await newsPaperRepo.getNewsPaper(whereCondition, order)
    if (result) {
        response.successGet(res, result, "Current Affairs");
    } else {
        response.errorNotFound(res, "Current Affairs");
    }
}

async function getIdAndNewsPaper(req, res, next) {
    try {
        const {newsPaperName,newsPaperId} = req.body
      
        let newsPaperWhereCaluse = {
            id : newsPaperId,
            newsPaperName: newsPaperName
        }
        let genOrder = [
            ['id', 'DESC']
        ]

        let result = await newsPaperRepo.getNewsPaper(newsPaperWhereCaluse, genOrder)
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
    getNewsPaper,
    getNewPaperDataBWtwodates,
    getNewsPaperNavigation,
    getNewsPaperNavigationByDate,
    getIdAndNewsPaper
}