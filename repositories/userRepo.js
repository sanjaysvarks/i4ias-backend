const db = require('../models/index')
const User = db.user
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

async function createNewUser(user) {
    user.password = authService.encyptPassword(user.password);
    user.id = 31;
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

module.exports = {
    getUserByPhoneOrEmail,
    createNewUser,
    updateUser

};





