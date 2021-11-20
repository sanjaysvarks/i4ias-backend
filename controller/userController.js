const response = require('../response')
const db = require('../models/index')
const User = db.user
const Op = db.Sequelize.Op



 function getUser(req,res,next){
     console.log('user list')
    response.success(res,'user list','user list')
 }


 module.exports = {
    getUser
 }