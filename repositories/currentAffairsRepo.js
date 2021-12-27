const db = require('../models/index')
const currentAffairs = db.currentAffairs
const categoryType = db.categoryType
const user = db.user;
const Op = db.Sequelize.Op



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

async function getCurrentAffairsData(where, limit, offset) {
    let result = await currentAffairs.findAndCountAll({
        attributes: ['id', 'description', 'tags', 'categoryType', 'userId', 'currentAffairsDate', 'createdAt', 'updatedAt'],
        where: where,
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


module.exports = {
    createCurrentAffairs,
    getCurrentAffairsData,
    updateCurrentAffairsData,
    deleteCurrentAffairsData,
    getCurrentAffairsDataById,
    getCategoryTypeData,
    getCurrentAffairsNavigationData

};