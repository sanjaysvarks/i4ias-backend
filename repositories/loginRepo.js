const db = require('../models/index')
const User = db.user
const Op = db.Sequelize.Op


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

module.exports = {
    getUserByPhoneOrEmail

};

