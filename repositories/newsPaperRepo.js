const db = require('../models/index')
const newsPapers = db.newsPapers
const user = db.user;
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

async function createNewsPaper(newspaperData) {
    const result = await newsPapers.create(newspaperData);
    return result;
}

async function deleteNewsPaper(whereCondition) {
    const result = newsPapers.destroy({
        where: whereCondition,
        returning: true
    })
    return result;
}

async function updateNewsPaper(whereCondition, updateInfo) {
    const result = newsPapers.update(updateInfo,
        {
            where: whereCondition,
            returning: true
        }
    );
    return result;
}

async function getNewsPaperByCondition(whereCondition) {
    const result = await newsPapers.findOne({
        where : whereCondition
    })
    return result;
}

async function getNewsPaper(whereCondition) {
    const result = await newsPapers.findAll({
        where : whereCondition,
        order: [
            ['id', 'DESC']
        ]
    })
    return result;
}

module.exports = {
    createNewsPaper,
    deleteNewsPaper,
    updateNewsPaper,
    getNewsPaperByCondition,
    getNewsPaper
}