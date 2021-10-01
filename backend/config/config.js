require('dotenv').config(); // this is important!

module.exports = {
    "development": {
        "username": process.env.DB_USER,    
        "password": process.env.DB_PASSWORD,
        "database": "groupomania-database_development",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "groupomania-database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
    },
    "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": "groupomania-database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
    }
};