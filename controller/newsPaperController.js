const response = require('../response')
const newsPaperRepo = require('../repositories/newsPaperRepo')
const db = require('../models/index')
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize
const pdf = require('html-pdf');
var mime = require('mime');



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

        let result = await newsPaperRepo.getNewsPaperByCondition(newsPaperWhereCaluse, genOrder)
        if (result) {
            console.log(result)
            response.successGet(res, result, "NewsPaper");

        } else {
            response.errorNotFound(res, "NewsPaper");
        }
    } catch (error) {

        response.error(res)
    }
}


async function getNewsPaperByDate(req, res, next) {
    const reqDate = req.query.date;
    const newsPaper = req.query.newsPaper;
    let order = [
        ['id', 'ASC']
    ]
    let where = Sequelize.where(
        Sequelize.literal('DATE_FORMAT(createdDate, "%d-%b-%Y")'),
        { [Op.eq]: reqDate }
    )
    let conditionList = [where]

    if (newsPaper) {
        conditionList.push(
            {
                newsPaperName: {
                    [Op.eq]: newsPaper
                }
            }
        )
    }

    var condition =
    {
        [Op.and]: conditionList
    }
    let result = await newsPaperRepo.getNewsPaper(condition,order)
    if (result) {
        response.successGet(res, result, "NewsPapers");
    } else {
        response.errorNotFound(res, "NewsPapers");
    }
}

async function getNewsPaperFolderName(req, res, next) {
    const newsPaper = req.body.newspaper
    let condition = {
        newsPaperName: newsPaper
    }
    console.log('condition===>',condition)
    let result = await newsPaperRepo.getNewsPaperFolderName(condition)
    console.log('result===>',result)
    if (result) {
        response.successGet(res, result, "NewsPapers");
    } else {
        response.errorNotFound(res, "NewsPapers");
    }
}

async function downloadNewsPaper(req, res, next) {
    try {
        let newsPaperId = req.query.id;
        let result = await newsPaperRepo.getNewsPaperPdfGen({id : newsPaperId})
        var options = { format: 'Letter' };
        
       // var header =  `<div id="pageHeader"  style="text-align: center;"><img src = "https://india4ias.com/assets/img/India4IASLogo.png"/> </div>`
        var header = ``
        var footer =  `<div id="pageFooter"  style="text-align: center; font-size: 12px;">www.India4IAS.com
                                             - {{page}}/{{pages}} </div>`
       // console.log('content getNewsPaperDemo' , result);
        var dataContainer = `<div style="background:url('http://65.2.42.25/assets/img/India4IASwatermark.png');display:block"><div  style="text-align: center;"><img src = "https://india4ias.com/assets/img/India4IASLogo.png"/> </div>`+result.content+`</div>`;
       

        pdf.create( header + dataContainer + footer, options).toBuffer(function (err, buffer) {
            var filename = "sample.pdf";
            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.end(buffer)
        }); 
    } catch (error) {
        console.log('Unable to download file',error)
        res.end("Unable to download file");
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
    getIdAndNewsPaper,
    getNewsPaperByDate,
    getNewsPaperFolderName,
    downloadNewsPaper
}