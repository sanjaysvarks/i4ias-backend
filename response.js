module.exports = {
  //----------------------Api Sucess response----------------------

  success: function (res, data, message) {
    let payload = {
      status: 200,
      success: true,
      message: message,
      data: data
    }
    res.status(200).json(payload);

  },

  error: function (res, error = 'Something went wrong') {
    res.status(400).json({
      success: false,
      message: error
    });
  },

  errorUnauthorizedToken: function (res) {
    res.status(401).json({
      status: 401,
      success: false,
      message: 'Authentication token was missing or incorrect'
    });
  },

  errorValidation: function (res,error="Bad input") {
    res.status(400).json({
      status:400,
      success: false,
      message: error
    });
  },

  successPost: function (res,data, itemsName = 'Data') {
    res.status(201).json({
      status:201,
      success: true,
      message: `The ${itemsName} was created successfully`,
      data: data
    });
  },

};
