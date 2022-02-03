const db = require('../models/index')
const sliders = db.sliders
const user = db.user;
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize


async function createSlider(sliderData) {
    const result = await sliders.create(sliderData);
    return result;
}

async function getSlider() {
    const result = await sliders.findAll()
    return result;
}


async function getSliderByCondition(whereCondition) {
    const result = await sliders.findOne({
        where : whereCondition
    })
    return result;
}

async function deleteSlider(whereCondition) {
    const result = sliders.destroy({
        where: whereCondition,
        returning: true
    })
    return result;
}

async function updateSlider(whereCondition, updateInfo) {
    const result = sliders.update(updateInfo,
        {
            where: whereCondition,
            returning: true
        }
    );
    return result;
}


module.exports = {
    createSlider,
    getSlider,
    deleteSlider,
    updateSlider,
    getSliderByCondition
}