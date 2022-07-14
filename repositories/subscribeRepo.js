const db = require('../models/index')
const User = db.user
const subscribe = db.subscribes
const Op = db.Sequelize.Op


async function createSubscriber(subscriberData) {
    const result = await subscribe.create(subscriberData);
    return result;
}

async function getsubscriberByPhoneOrEmail( email) {
    var condition =
    {
        email: email
    }



    let result = await subscribe.findOne({
        where: condition
    })

    return result;
}

async function getscribers() {
    const result = await subscribe.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
    return result;
}

module.exports = {
    createSubscriber,
    getsubscriberByPhoneOrEmail,
    getscribers
};
