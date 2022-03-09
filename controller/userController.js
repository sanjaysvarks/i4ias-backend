const response = require('../response')
const userRepo = require('../repositories/userRepo')
const RESOURSE_NAME = "User"
const db = require('../models/index')
const Op = db.Sequelize.Op
const csvGenerator = require('../services/csvFileGenerator')


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

async function getUser(req, res, next) {
   const { user } = req.body
   let result = await userRepo.getUserById(user.id)
   let userJson = result.toJSON();
   response.successGet(res, userJson, "User");

}

async function createScholarship(req, res, next) {
   try {
   const { fullName, email, phone, course, gender, dob, city, graduation,
      testMode, testCenter, govtIdType, govtIdDetails, tcFlag } = req.body

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

   let Scholarship = {
      fullName,
      email,
      phone,
      course,
      gender,
      dob,
      city,
      graduation,
      testMode,
      testCenter,
      govtIdType,
      govtIdDetails,
      tcFlag
   }

   let result = await userRepo.getScholarshipByCondition(condition)
   if (result) {
      response.errorValidation(res, "you are already Register ! ")
   }
   else {
      let ScholarshipData = await userRepo.createScholarship(Scholarship)
      if (ScholarshipData) {
         response.successRegisterPost(res, ScholarshipData, "Register");
      }
      else {
         response.error(res)
      }
   }
   } catch (error) {
      console.log(error)
      response.error(res)
   }
}

async function getScholarship(req, res, next) {
   try {
      // let { limit, offset } = req.body;

       let result = await userRepo.getScholarship();
       if (result) {
           response.successGet(res, result, "Register User");
       } else {
           response.errorNotFound(res, "Register User");
       }
   } catch (error) {
       response.error(res)
   }
}

async function excelSheetData(req, res, next) {
   let fromDate = req.query.fromDate
   let toDate = req.query.toDate
   
   let query = `select  fullName, email, phone, course, gender, dob, city, 
                        graduation, testMode, testCenter, govtIdType, 
                        govtIdDetails,DATE_FORMAT(createdAt, "%d-%b-%Y") createdAt
                from scholarships
                where DATE_FORMAT(createdAt, "%d-%b-%Y") >= '${fromDate}' and 
                      DATE_FORMAT(createdAt, "%d-%b-%Y") <= '${toDate}'`
   console.log(query)
   let data = await db.sequelize.query(query)

   const generatedCSV = csvGenerator.generate(['fullName', 'email', 'phone','course','gender', 'dob', 'city','graduation','testMode','testCenter','govtIdType','govtIdDetails','createdAt'], data[0])
   response.successCSV(res, generatedCSV, 'studentList')
}

module.exports = {
   createUser,
   getUser,
   createScholarship,
   getScholarship,
   excelSheetData
}