require('dotenv').config()
const db = require('../models/index')
const User = db.user

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
//const saltRound = 11;
const SECRET = process.env.JWT_SECRET



module.exports = {
  comparePassword: (plainPassword, hash) => {
    return bcrypt.compareSync(plainPassword, hash)
  },

  generateToken: (userJson) => {
    const token = jwt.sign(userJson, SECRET);
    return token;

  },

  decodeToken: (token) => {
    //check user object for last token generation time
    //if decoded token has valid last token generation time 

    let decoded;
    try {
      decoded = jwt.verify(token, SECRET);
      return decoded;
    } catch (e) {
      return;
    }
  },

  verifyToken: async (token) => {

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET);
    } catch (e) {
    }
    console.log('DECODE');
    console.log(decodedToken);
    if (decodedToken) {
      const user = await User.findOne({
        where: { id: decodedToken.id },
     
      })
      console.log(user);
      if (!user) return false
      //Support legacy users
 
      return true
    } else return false

  }

};




