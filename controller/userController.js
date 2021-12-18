const response = require('../response')
const userRepo = require('../repositories/userRepo')
const RESOURSE_NAME = "User"


async function createUser(req, res, next) {
   const { user } = req.body
   let result = await userRepo.getUserByPhoneOrEmail(user.phone, user.email)
   if (result) {
      response.errorValidation(res, "User is already registered with this email id or phone number ")
   }
   else {
      let createdUserData = await userRepo.createNewUser(user)
      if (createdUserData) {
         let userJson = JSON.parse(JSON.stringify(createdUserData))
         delete userJson.password
         response.successPost(res, userJson, "User");
      }
   }
}

async function getUser(req,res,next){
   const { user } = req.body 
   let result =  await userRepo.getUserById(user.id)
   let userJson = result.toJSON();
   response.successGet(res, userJson, "User");
   
}


module.exports = {
   createUser,
   getUser
}