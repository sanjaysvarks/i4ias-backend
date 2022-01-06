const db = require('../models/index')
const currentAffairs = db.currentAffairs
const categoryType = db.categoryType
const user = db.user;
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize


async function createCurrentAffairs(currentAffairsData) {
    const result = await currentAffairs.create(currentAffairsData);
    return result;
}

async function getCurrentAffairsDataById(currentAffairsId) {
    var condition = {
        id: currentAffairsId
    }

    let result = await currentAffairs.findOne({
        where: condition
    })

    return result;
}

async function getCurrentAffairsData(whereCondition, limit, pageNo) {
    if (pageNo <= 0)
        pageNo = 1
    let result = await currentAffairs.findAndCountAll({
        attributes: ['id', 'description', 'tags', 'categoryType', 'userId', 'currentAffairsDate', 'createdAt', 'updatedAt'],
        where: whereCondition,
        order: [
            ['id', 'Asc'],
        ],
        include: [
            {
                model: user,
                attributes: ['fname', 'lname', 'updated_at'],
                as: 'user'
            }
        ],
        limit: limit,
        offset: (pageNo - 1) * limit,
    })
    return result;
}

async function getAllCurrentAffairsData() {
    let result = await currentAffairs.findAll({
        attributes: ['id', 'description', 'tags', 'categoryType', 'userId', 'currentAffairsDate', 'createdAt', 'updatedAt'],
        order: [
            ['createdAt', 'DESC'],
        ],
        include: [
            {
                model: user,
                attributes: ['fname', 'lname', 'updated_at'],
                as: 'user'
            }
        ]
    })
    return result;
}

async function updateCurrentAffairsData(currentAffairsId, updateInfo) {
    const result = currentAffairs.update(updateInfo,
        {
            where: { id: currentAffairsId },
            returning: true
        }
    );

    return result;
}

async function deleteCurrentAffairsData(currentAffairsIds) {
    const result = currentAffairs.destroy({ where: { id: currentAffairsIds }, returning: true })
    return result;
}


async function getCategoryTypeData() {
    let result = await categoryType.findAll()
    return result;
}

async function getCurrentAffairsNavigationData(currentId, action, categoryType) {

    let whereCondition = null;
    let order = null;
    if (action == 'next') {
        console.log('action ', action)
        whereCondition = {
            id: { [Op.gt]: currentId }
        }
        order = [
            ['id', 'ASC'],
        ]
    }
    else {
        whereCondition = {
            id: { [Op.lt]: currentId }
        }
        order = [
            ['id', 'DESC'],
        ]
    }

    if (categoryType && categoryType != "") {
        whereCondition.categoryType = {
            [Op.eq]: categoryType
        }
    }

    let result = await currentAffairs.findOne({
        where: whereCondition,
        order: order
    })

    return result;
}


async function getCurrentAffairsNavigationByTypenDate(currentAffDate, categorytype, action) {

    let whereCondition = null;
    let order = null;
    if (action == 'next') {
        console.log('action ', action)
        let where = Sequelize.where(
            Sequelize.literal('DATE_FORMAT(currentAffairsDate, "%d-%b-%Y")'),
            { [Op.gt]: currentAffDate }
        )

        whereCondition = {
            where,
            categoryType: categorytype
        }
        order = [
            ['currentAffairsDate', 'ASC'],
        ]
    }
    else {

        let where = Sequelize.where(
            Sequelize.literal('DATE_FORMAT(currentAffairsDate, "%d-%b-%Y")'),
            { [Op.lt]: currentAffDate }
        )

        whereCondition = {
            where,
            categoryType: categorytype
        }
        order = [
            ['currentAffairsDate', 'DESC'],
        ]
    }


    let result = await currentAffairs.findAll({
        attributes: ['id', 'description', 'content',
            'tags', 'categoryType',
            'userId', [db.Sequelize.fn('DATE_FORMAT', db.Sequelize.col('currentAffairsDate'), '%d-%b-%Y'), 'currentAffairsDate'],
            'createdAt', 'updatedAt'],
        where: whereCondition,
        order: order
    })

    return result;
}

async function searchByCondition(whereCondition) {

    let result = await currentAffairs.findAll({
        where: whereCondition
    })
    return result;

}

async function getDateForFolderNameData(categorytype) {
    let condition = {
        categoryType: categorytype
    }

    let result = await currentAffairs.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.literal('DATE_FORMAT(currentAffairsDate, "%d-%b-%Y")')), 'currentAffairsDate']],
        where: condition,
        order: [
            ['currentAffairsDate', 'DESC']
        ],
        limit: 30
    })
    return result;

}

module.exports = {
    createCurrentAffairs,
    getCurrentAffairsData,
    getAllCurrentAffairsData,
    updateCurrentAffairsData,
    deleteCurrentAffairsData,
    getCurrentAffairsDataById,
    getCategoryTypeData,
    getCurrentAffairsNavigationData,
    searchByCondition,
    getDateForFolderNameData,
    getCurrentAffairsNavigationByTypenDate
};