const db = require('../models/index')
const testimonials = db.testimonials
const user = db.user;
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

async function createTestimonial(sliderData) {
    const result = await testimonials.create(sliderData);
    return result;
}

async function deleteTestimonial(whereCondition) {
    const result = testimonials.destroy({
        where: whereCondition,
        returning: true
    })
    return result;
}

async function updateTestimonial(whereCondition, updateInfo) {
    const result = testimonials.update(updateInfo,
        {
            where: whereCondition,
            returning: true
        }
    );
    return result;
}

async function getTestimonialByCondition(whereCondition) {
    const result = await testimonials.findOne({
        where : whereCondition
    })
    return result;
}

async function getTestimonial() {
    const result = await testimonials.findAll()
    return result;
}

module.exports = {
    createTestimonial,
    deleteTestimonial,
    updateTestimonial,
    getTestimonialByCondition,
    getTestimonial
}