const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()
const db=require('./routes/modal');

const app = express();

db.mongoose.connect(db.url, {useNewUrlParser: true,useUnifiedTopology: true},()=>console.log(`Enter into dbURL`))
  .then(() => {console.log("Connected to the database!");})
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(bodyParser.json());

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});