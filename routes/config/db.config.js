const {DB_USER, DB_PASS,DB_NAME} = require('../envconfig/envconfig');

 module.exports = 
 {url: 
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.njre5.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`} 

