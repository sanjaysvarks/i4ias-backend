const db = require('../models/index')
const tickers = db.tickers
const user = db.user;
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

async function createTicker(sliderData) {
    const result = await tickers.create(sliderData);
    return result;
}

async function deleteTicker(whereCondition) {
    const result = tickers.destroy({
        where: whereCondition,
        returning: true
    })
    return result;
}

async function updateTicker(whereCondition, updateInfo) {
    const result = tickers.update(updateInfo,
        {
            where: whereCondition,
            returning: true
        }
    );
    return result;
}

async function getTickerByCondition(whereCondition) {
    const result = await tickers.findOne({
        where : whereCondition
    })
    return result;
}

async function getTicker() {
    const result = await tickers.findAll()
    return result;
}

module.exports = {
    createTicker,
    deleteTicker,
    updateTicker,
    getTickerByCondition,
    getTicker
}