const response = require('../response')
const subscribeRepo = require('../repositories/subscribeRepo')
const RESOURSE_NAME = "User"
const db = require('../models/index')
const Op = db.Sequelize.Op


async function createSubscriber(req, res, next) {
    try {
        const { email } = req.body
        let result = await subscribeRepo.getsubscriberByPhoneOrEmail( email)
        if (result) {
            response.errorValidation(res, "User is already Subscribed with this email id")
        }
        else {
            let subscriberData = {
                email: email
            }

            console.log('subscriberData', subscriberData)
            let subResult = await subscribeRepo.createSubscriber(subscriberData)
            if (subResult) {
                response.successRegisterPost(res, subResult, "You are Subscribed");
            } else {
                console.log(error)   
                response.error(res)
                

            }
        }


    } catch (error) {
        console.log(error)
        response.error(res)

    }
}

async function getSubscriber(req, res, next) {
    try {
       // let { limit, offset } = req.body;
 
        let result = await subscribeRepo.getscribers();
        if (result) {
            response.successGet(res, result, "Subscriber");
        } else {
            response.errorNotFound(res, "Subscriber");
        }
    } catch (error) {
        response.error(res)
    }
 }



module.exports = {
    createSubscriber,
    getSubscriber
}