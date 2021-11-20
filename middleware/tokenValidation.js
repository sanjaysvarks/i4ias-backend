const authService = require('../services/authServices')
const response = require('../response')


module.exports = {

  token: (req, res, next) => {
    let token = req.headers.authorization;
    console.log('token req', req.headers)
    if (!token) {
      console.log("error1 ======>")
      response.errorUnauthorizedToken(res);
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    } else {
      console.log("error2 ======>")
      response.errorUnauthorizedToken(res);
    }

    authService.verifyToken(token).then(isVerified => {
      console.log("isverifed =========>", isVerified)
      if (isVerified) {
        //TODO get rid of unnescerry params
        // req.headers.user = authService.decodeToken(token)
        next()
      } else {
        console.log("error3 ======>")
        response.errorUnauthorizedToken(res);
      }
    })

  },


}

