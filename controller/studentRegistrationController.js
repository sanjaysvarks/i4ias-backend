const response = require('../response')
const studentRegistrationRepo = require('../repositories/studentRegistrationRepo')
//const RESOURSE_NAME = "User"
const db = require('../models/index')
const Op = db.Sequelize.Op
const csvGenerator = require('../services/csvFileGenerator')


async function createstudentRegistration(req, res, next) {

    try {
        const { name, email, phone, testType, testMode, flag } = req.body
        let RegData = {
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
        let studentRegData = {
            name: name,
            email: email,
            phone: phone,
            testType: testType,
            testMode: testMode,
            flag: flag
        }

        let result = await studentRegistrationRepo.getstudentRegistrationByCondition(RegData)
        if (result) {
            response.errorValidation(res, "Student is already registered with this email id or phone number ")
        }
        else {
            let createdStudentData = await studentRegistrationRepo.createstudentRegistration(studentRegData)
            if (createdStudentData) {
                response.successStudentRegistrationPost(res, createdStudentData, "student Registred");
            }
        }

    } catch (error) {

        response.error(res);
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
    let flag = req.query.flag

    if (flag) {
        const query = `select  name, email, phone, testType, testMode, 
                         DATE_FORMAT(createdAt, "%d-%b-%Y") createdAt,
                         flag
                from studentRegistrations
                where DATE_FORMAT(createdAt, "%d-%b-%Y") >= '${fromDate}' and 
                      DATE_FORMAT(createdAt, "%d-%b-%Y") <= '${toDate}' and 
                      flag = '${flag}'`
        let data = await db.sequelize.query(query)

        const generatedCSV = csvGenerator.generate(['name', 'email', 'phone', 'testType', 'testMode', 'createdAt','flag'], data[0])
        response.successCSV(res, generatedCSV, 'studentList')

    } else {
        const query = `select  name, email, phone, testType, testMode, 
                              DATE_FORMAT(createdAt, "%d-%b-%Y") createdAt,
                              flag
                    from studentRegistrations
                    where DATE_FORMAT(createdAt, "%d-%b-%Y") >= '${fromDate}' and 
                        DATE_FORMAT(createdAt, "%d-%b-%Y") <= '${toDate}'`
        let data = await db.sequelize.query(query)

        const generatedCSV = csvGenerator.generate(['name', 'email', 'phone', 'testType', 'testMode', 'createdAt','flag'], data[0])
        response.successCSV(res, generatedCSV, 'studentList')
    }
    //console.log(query)

}

module.exports = {
    createstudentRegistration,
    getstudentRegistration,
    excelSheetDataStuReg
}