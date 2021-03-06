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

  successPost: function (res,data, itemsName = 'Data') {
    res.status(201).json({
      status:201,
      success: true,
      message: `The ${itemsName} was created successfully`,
      data: data
    });
  },

  successStudentRegistrationPost: function (res,data, itemsName = 'Data') {
    res.status(201).json({
      status:201,
      success: true,
      message: `You have successfully submitted the form`,
      data: data
    });
  },

  successRegisterPost: function (res,data, itemsName = 'Data') {
    res.status(201).json({
      status:201,
      success: true,
      message: `${itemsName} successfully`,
      data: data
    });
  },

  successFileUploadPost: function (res,data, itemsName = 'Data') {
    res.status(201).json({
      status:201,
      success: true,
      message: `The ${itemsName} Uploaded Successfully`,
      data: data
    });
  },
  
  successGet: function (res,data, itemsName = 'Data') {
    res.status(200).json({
      status:200,
      success: true,
      message: `${itemsName} fetched successfully`,
      data: data
    });
  },

  error: function (res, error = 'Bad Request') {
    res.status(400).json({
      status: 400,
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

  errorNotFound: function (res,itemsName = 'Data') {
    res.status(404).json({
      status:404,
      success: false,
      message: `${itemsName} does not exist`
    });
  },

  successCSV: (res, data, filename) => {
    res.setHeader('Content-disposition', `attachment; filename=${filename}-Report-${new Date()}.csv`);
    res.set('Content-Type', 'text/csv');
    return res.status(200).send(data);
  },
  
};
