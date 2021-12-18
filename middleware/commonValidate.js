const response = require('../response');
const validate = (result, res, next) => {
    console.log("error result ===>", result)
    if (!result.error) {
        next();
    } else {
        response.errorValidation(res, result.error.details[0].message);
    }
}

module.exports = validate;