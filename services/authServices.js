require('dotenv').config()

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
//const saltRound = 11;
const SECRET = process.env.JWT_SECRET



module.exports = {
  comparePassword: (plainPassword, hash) => {
    return bcrypt.compareSync(plainPassword, hash)
  },

  generateToken: async (user) => {
    //generate token
    //update token generation time to user 

    const currentTime = new Date().getTime();
      const token = jwt.sign(user, SECRET);
      return token;

  }

};




