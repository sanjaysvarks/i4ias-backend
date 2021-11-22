const db = require('../models/index')
const User = db.user
const authService = require('../services/authServices') 


async function createNewUser(fName, lName, email, phone, password, gender, role, dob, address, pincode, city, state,lastLogin){
    //create user
    let user =
    {
        id : 25, 
        fName : fName,
        lName : lName,
        email : email,
        phone : phone,
        password : authService.encyptPassword(password),
        gender :  gender,
        role : role,
        dob : dob,
        address : address,
        pincode : pincode,
        city : city,
        state : state,
        lastLogin: new Date()
    }

    const result =  await User.create(user);
    return result;

}

module.exports = {
    createNewUser

};





