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

async function getNewsPaperByCondition(whereCondition, genOrder) {
    const result = await newsPapers.findOne({
        attributes: [
            'id', 'newsPaperName', 'description', 'content',
            [db.Sequelize.fn('DATE_FORMAT', db.Sequelize.col('createdDate'), '%d-%b-%Y'), 'createdDate'],
            'userId', 'createdAt', 'updatedAt'],
        where: whereCondition,
        order: genOrder
    })
    return result;
}

async function getNewsPaper(whereCondition, genOrder) {
    const result = await newsPapers.findAll({
        attributes: [
            'id', 'newsPaperName', 'description', 'content',
            [db.Sequelize.fn('DATE_FORMAT', db.Sequelize.col('createdDate'), '%d-%b-%Y'), 'createdDate'],
            'userId', 'createdAt', 'updatedAt'],
        where: whereCondition,
        order: genOrder
    })
    return result;
}

async function getNewsPaperFolderName(whereCondition) {
  
    let result = await newsPapers.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.literal('DATE_FORMAT(createdDate, "%d-%b-%Y")')), 'createdDate']],
        where: whereCondition,
        order: [
            ['createdDate', 'DESC']
        ],
        limit: 30
    })
    console.log('repo result===>',result)
    return result;

}

async function getNewsPaperPdfGen(whereCondition) {
    const result = await newsPapers.findOne({
        attributes: [
            'id', 'newsPaperName', 'description', 'content',
            [db.Sequelize.fn('DATE_FORMAT', db.Sequelize.col('createdDate'), '%d-%b-%Y'), 'createdDate'],
            'userId', 'createdAt', 'updatedAt'],
        where: whereCondition,
        order: [
            ['id', 'ASC']
        ]
    })
    return result;
}

module.exports = {
    createNewsPaper,
    deleteNewsPaper,
    updateNewsPaper,
    getNewsPaperByCondition,
    getNewsPaper,
    getNewsPaperFolderName,
    getNewsPaperPdfGen
}