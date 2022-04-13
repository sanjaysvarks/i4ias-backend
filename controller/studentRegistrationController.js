const response = require('../response')
const studentRegistrationRepo = require('../repositories/studentRegistrationRepo')
//const RESOURSE_NAME = "User"
const db = require('../models/index')
const Op = db.Sequelize.Op
const csvGenerator = require('../services/csvFileGenerator')


async function createstudentRegistration(req, res, next) {
    const { name, email, phone, testType, testMode } = req.body
    
    let RegData = { 
        email: email,
        phone: phone
    }
    let studentRegData = {
        name: name,
        email: email,
        phone: phone,
        testType: testType,
        testMode: testMode
    }



    let result = await studentRegistrationRepo.getstudentRegistrationByCondition(RegData)
    if (result) {
        response.errorValidation(res, "Student is already registered with this email id or phone number ")
    }
    else {
        let createdStudentData = await studentRegistrationRepo.createstudentRegistration(studentRegData)
        if (createdStudentData) {
            response.successPost(res, createdStudentData, "student Registred");
        }
    }
}

async function getstudentRegistration(req, res, next) {
    let studentRegResult = await studentRegistrationRepo.getstudentRegistration()
    if (studentRegResult) {
        response.successGet(res, studentRegResult);
    }

    

    
}

async function excelSheetDataStuReg(req, res, next) {
    let fromDate = req.query.fromDate
    let toDate = req.query.toDate

    let query = `select  name, email, phone, testType, testMode, 
                         DATE_FORMAT(createdAt, "%d-%b-%Y") createdAt
                from studentRegistrations
                where DATE_FORMAT(createdAt, "%d-%b-%Y") >= '${fromDate}' and 
                      DATE_FORMAT(createdAt, "%d-%b-%Y") <= '${toDate}'`
    console.log(query)
    let data = await db.sequelize.query(query)

    const generatedCSV = csvGenerator.generate(['name', 'email', 'phone', 'testType', 'testMode','createdAt'], data[0])
    response.successCSV(res, generatedCSV, 'studentList')
}

module.exports = {
    createstudentRegistration,
    getstudentRegistration,
    excelSheetDataStuReg
}