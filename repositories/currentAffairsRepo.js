const db = require('../models/index')
const currentAffairs = db.currentAffairs
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

async function getCurrentAffairsData() {
    let result = await currentAffairs.findAll();
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



module.exports = {
    createCurrentAffairs,
    getCurrentAffairsData,
    updateCurrentAffairsData,
    deleteCurrentAffairsData,
    getCurrentAffairsDataById

};