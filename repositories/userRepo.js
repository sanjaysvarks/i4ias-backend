const db = require('../models/index')
const User = db.user
const scholarships= db.scholarships
const Op = db.Sequelize.Op
const authService = require('../services/authServices')


async function getUserByPhoneOrEmail(phone, email) {
    var condition =
    {
        [Op.or]: [
            {
                phone: {
                    [Op.eq]: phone
                },
            },
            {
                email: {
                    [Op.eq]: email
                }
            }
        ]
    }
    let result = await User.findOne({
        where: condition
    })

    return result;
}

async function getUserById(id) {
    var condition =
    {
                id: {
                    [Op.eq]: id
                }
      
    }
    let result = await User.findOne({
        where: condition
    })

    return result;
}

async function createNewUser(user) {
    user.password = authService.encyptPassword(user.password);
    const result = await User.create(user);
    return result;
}

async function updateUser(id, updateInfo) {
    const result = User.update(updateInfo,
        {
            where: { id: id },
            returning: true
        }
    );

    return result;
}

async function createScholarship(scholarshipData) {
    const result = await scholarships.create(scholarshipData);
    return result;
}

async function getScholarshipByCondition(whereCondition) {
    const result = await scholarships.findOne({
        where : whereCondition
    })
    return result;
}

module.exports = {
    getUserByPhoneOrEmail,
    createNewUser,
    updateUser,
    getUserById,
    createScholarship,
    getScholarshipByCondition

};





