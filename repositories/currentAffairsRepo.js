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

async function getCurrentAffairsData(limit, offset) {
    let result = await currentAffairs.findAndCountAll({
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
        ],
        limit: limit,
        offset: offset,
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

async function getCurrentAffairsNavigationData(currentId, action) {

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

    let result = await currentAffairs.findOne({
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

async function getDateForFolderNameData() {
    let result = await currentAffairs.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.literal('CONVERT(currentAffairsDate, DATE)')), 'currentAffairsDate']],
        order: [
            ['currentAffairsDate', 'DESC']
        ],
        limit : 30
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
    getDateForFolderNameData
};