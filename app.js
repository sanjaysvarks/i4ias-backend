const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const route = require('./routes')

app.use(cors());
//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '20mb'}))
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/ping', (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Api running successfully."
  })
})

route(app);



module.exports = {
  app
}


