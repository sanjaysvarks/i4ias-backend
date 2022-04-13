const db = require('../models/index')
const studentRegistrations = db.studentRegistrations
const user = db.user;
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

async function createstudentRegistration(studentRegistrationData) {
    const result = await studentRegistrations.create(studentRegistrationData);
    return result;
}

async function deletestudentRegistration(whereCondition) {
    const result = studentRegistrations.destroy({
        where: whereCondition,
        returning: true
    })
    return result;
}

async function updatestudentRegistration(whereCondition, updateInfo) {
    const result = studentRegistrations.update(updateInfo,
        {
            where: whereCondition,
            returning: true
        }
    );
    return result;
}

async function getstudentRegistrationByCondition(whereCondition) {
    const result = await studentRegistrations.findOne({
        where: whereCondition
    })
    return result;
}

async function getstudentRegistration(whereCondition) {
   
    if (whereCondition) {
        const result = await studentRegistrations.findAll({
            where: whereCondition,
            order: [
                ['createdAt', 'DESC']
            ]
        })
        return result;
    }
    else {
        const result = await studentRegistrations.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
        return result;
    }
    
}



module.exports = {
    createstudentRegistration,
    deletestudentRegistration,
    updatestudentRegistration,
    getstudentRegistrationByCondition,
    getstudentRegistration
}