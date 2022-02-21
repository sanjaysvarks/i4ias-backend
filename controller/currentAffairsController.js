const response = require('../response')
const currentAffairsRepo = require('../repositories/currentAffairsRepo')
const db = require('../models/index')
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize
//const pdf = require('html-pdf');
var mime = require('mime');


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
// async function getCurrentAffairs(req, res, next) {
//     let { limit, pageNo } = req.body;

//     let result = await currentAffairsRepo.getCurrentAffairsData(limit, limit * pageNo);
//     if (result) {
//         response.successGet(res, result, "Current Affairs");
//     } else {
//         response.error(res, "Current Affairs");
//     }
// }

async function getAllCurrentAffairs(req, res, next) {

    let result = await currentAffairsRepo.getAllCurrentAffairsData();
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
    let result = await  currentAffairsRepo.deleteCurrentAffairsData(ids)
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

async function getCurrentAffairsNavigation(req, res, next) {
    const { currentId, action, categoryType } = req.body

    let result = await currentAffairsRepo.getCurrentAffairsNavigationData(currentId, action, categoryType)
    if (result) {
        response.successGet(res, result, "Current Affairs");
    } else {
        response.errorNotFound(res, "Current Affairs");
    }

}

async function getCurrentAffairsNavigationByDatenType(req, res, next) {
    const { currentAffDate, categorytype, action } = req.body

    let result = await currentAffairsRepo.getCurrentAffairsNavigationByTypenDate(currentAffDate, categorytype, action)
    if (result) {
        response.successGet(res, result, "Current Affairs");
    } else {
        response.errorNotFound(res, "Current Affairs");
    }

}

async function getCurrentAffairsByTag(req, res, next) {
    const query = req.query.tag;
    
    let order = [
        ['id', 'DESC']
    ]

    let whereCondition = {
        tags: {
            [Op.like]: '%' + query + '%'
        }
    };
    let result = await currentAffairsRepo.searchByCondition(whereCondition,order)
    if (result) {
        response.successGet(res, result, "Current Affairs");
    } else {
        response.errorNotFound(res, "Current Affairs");
    }
}

async function getCurrentAffairsByDate(req, res, next) {
    const query = req.query.date;
    const categoryType = req.query.categoryType;
    let order = [
        ['id', 'ASC']
    ]
    let where = Sequelize.where(
        Sequelize.literal('DATE_FORMAT(currentAffairsDate, "%d-%b-%Y")'),
        { [Op.eq]: query }
    )
    let conditionList = [where]

    if (categoryType) {
        conditionList.push(
            {
                categoryType: {
                    [Op.eq]: categoryType
                }
            }
        )
    }

    var condition =
    {
        [Op.and]: conditionList
    }
    let result = await currentAffairsRepo.searchByCondition(condition,order)
    if (result) {
        response.successGet(res, result, "Current Affairs");
    } else {
        response.errorNotFound(res, "Current Affairs");
    }
}

async function getCurrentAffairsBycatetoryType(req, res, next) {

    const categorytype = req.query.categorytype;
    let order = [
        ['id', 'DESC']
    ]
    whereCondition = {
        categoryType: categorytype
    }

    let result = await currentAffairsRepo.searchByCondition(whereCondition,order)
    if (result) {
        response.successGet(res, result, "Current Affairs");
    } else {
        response.errorNotFound(res, "Current Affairs");
    }
}




let downloadpdf = async (req, res, next) => {
    let currentAffairsId = req.query.id;
    let result = await currentAffairsRepo.getCurrentAffairsDataById(currentAffairsId)
    if (result && result.content) {
        let options = {
            "format": "A4",
            "height": "45mm",
            header: {
                "contents": '<div style="position:relative; top: -250px; font-size: 150px; color: grey; transform: rotate(-45deg);"/>dkjflkjsdflkjdsflkjsdkfbsdlkjfbsldkjbflksdj</div>'
            }
        };
        pdf.create(result.content, options).toBuffer(function (err, buffer) {
            var filename = "sample.pdf";
            var mimetype = mime.lookup(filename);

            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);
            res.end(buffer)
        });
    } else {
        response.end("Unable to download file");
    }
}

async function getDateForFolderName(req, res, next) {
    const categorytype = req.query.categorytype
    let result = await currentAffairsRepo.getDateForFolderNameData(categorytype)
    if (result) {
        response.successGet(res, result, "Current Affairs");
    } else {
        response.errorNotFound(res, "Current Affairs");
    }
}

async function getDataFromToDate(req, res, next) {
    const { fromDate, toDate } = req.body;

    let fromdate = Sequelize.where(
        Sequelize.literal('DATE_FORMAT(currentAffairsDate, "%d-%b-%Y")'),
        { [Op.gte]: fromDate }
    )

    let todate = Sequelize.where(
        Sequelize.literal('DATE_FORMAT(currentAffairsDate, "%d-%b-%Y")'),
        { [Op.lte]: toDate }
    )

    let whereCondition = {
        fromdate,
        todate

    }

    let result = await currentAffairsRepo.getCurrentAffairsData(whereCondition)
    if (result) {
        response.successGet(res, result, "Current Affairs");
    } else {
        response.error(res, "Current Affairs");
    }

}

async function getRecentRecords(req, res, next) {
    let  currentAffairs = 'CA'
    let  impEditorials  = 'Important Editorials'

    let query =`select distinct id,recentRecords, 
                       DATE_FORMAT(currentAffairsDate, "%d-%b-%Y") currentAffairsDate,
                       categoryType 
                from 
                (
				(select 0 as id,CONVERT(DATE_FORMAT(currentAffairsDate, "%d-%b-%Y"),char) recentRecords,
                        currentAffairsDate,
                        categoryType 
				from currentAffairs  
				where categoryType = '${currentAffairs}')
                union all
				(select id,description recentRecords,
                        currentAffairsDate,
                        categoryType 
				from currentAffairs  
				where categoryType = '${impEditorials}')
				) a
				order by a.currentAffairsDate desc`

    let data = await db.sequelize.query(query)

    response.successGet(res, data[0])

}


module.exports = {
    createCurrentAffairs,
   // getCurrentAffairs,
    getAllCurrentAffairs,
    getCurrentAffairsById,
    updateCurrentAffairs,
    deleteCurrentAffairs,
    getCategoryType,
    getCurrentAffairsNavigation,
    getCurrentAffairsByTag,
    getCurrentAffairsByDate,
    downloadpdf,
    getDateForFolderName,
    getCurrentAffairsNavigationByDatenType,
    getCurrentAffairsBycatetoryType,
    getDataFromToDate,
    getRecentRecords
}