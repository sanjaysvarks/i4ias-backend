const response = require('../response')
const db = require('../models/index')
const User = db.user
const Op = db.Sequelize.Op
const loginrepo = require('../repositories/loginRepo')
const userRepo = require('../repositories/userRepo')


 async function createUser(req,res,next){
   const { fName, lName, email, phone, password, gender, role, dob, address, pincode, city, state,lastLogin} = req.body 
   let result = await loginrepo.getUserByPhoneOrEmail(phone, email)
   if(result) 
   {
      response.errorValidation(res, "User is already registered with this email id or phone number ")
   }
   else 
   {
      let createdUserData = await userRepo.createNewUser(fName, lName, email, phone, password, gender, role, dob, address, pincode, city, state,lastLogin)
      if (createdUserData)
      {
         let userJson = JSON.parse(JSON.stringify(createdUserData))
         delete userJson.password
         response.successPost(res, userJson, "User")
  
      }
   } 
}      



 module.exports = {
   createUser
 }