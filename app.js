const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const route = require('./routes')


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

route(app);

module.exports = {
  app
}


