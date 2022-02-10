const db = require('../models/index')
const whatsNews = db.whatsNews
const user = db.user;
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

async function createWhatsNew(whatsNewData) {
    const result = await whatsNews.create(whatsNewData);
    return result;
}

async function deleteWhatsNew(whereCondition) {
    const result = whatsNews.destroy({
        where: whereCondition,
        returning: true
    })
    return result;
}

async function updateWhatsNew(whereCondition, updateInfo) {
    const result = whatsNews.update(updateInfo,
        {
            where: whereCondition,
            returning: true
        }
    );
    return result;
}

async function getWhatsNewByCondition(whereCondition) {
    const result = await whatsNews.findOne({
        where: whereCondition
    })
    return result;
}

async function getWhatsNew(whereCondition) {
   
    if (whereCondition) {
        const result = await whatsNews.findAll({
            where: whereCondition
        })
        return result;
    }
    else {
        const result = await whatsNews.findAll()
        return result;
    }
    
}



module.exports = {
    createWhatsNew,
    deleteWhatsNew,
    updateWhatsNew,
    getWhatsNewByCondition,
    getWhatsNew
}