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
        where: where,
        order: [
            ['currentAffairsDate', 'DESC'],
        ],
        include: [
            {
                model: user,
                attributes: ['fname','lname','updated_at'],
                as:'user'
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


module.exports = {
    createCurrentAffairs,
    getCurrentAffairsData,
    updateCurrentAffairsData,
    deleteCurrentAffairsData,
    getCurrentAffairsDataById,
    getCategoryTypeData

};