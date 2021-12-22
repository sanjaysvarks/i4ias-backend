require('dotenv').config();
module.exports =  {
  "development": {
    "username": process.env.UNAME,
    "password":process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "mysql"
  },

  "test": {
    "username": "root",
    "password": "root12",
    "database": "i4ias",
    "host": "localhost",
    "dialect": "mysql"
  },
  
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
