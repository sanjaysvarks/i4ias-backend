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

};
