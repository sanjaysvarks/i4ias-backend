const http = require('http')
const { app } = require('./app')
//var db = require('./models');

http.createServer(app).listen(3000, (err) => {
  if (err) {
    console.log(`Error while start up the server, ${err}`);
    process.exit(2);
  }
 //seq sync using for creating tables Dynamically
  //db.sequelize.sync();
  console.log(`HTTP server running on ${3000}`);

});