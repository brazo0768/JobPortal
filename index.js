const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()
var testAPIRouter = require('./routes/portal.routes');
var cors = require("cors");

// IMPORT MODELS
const db = require('./routes/modal');

const app = express();


db.mongoose.connect(process.env.MONGODB_URI || 
    db.url, { useNewUrlParser: true, useUnifiedTopology: true },
     () => console.log(`Enter into URL`))
  .then(() => { console.log("Connected to the database!"); })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(bodyParser.json());
app.use(cors());
//IMPORT ROUTES
app.use('/', testAPIRouter);



if (process.env.NODE_ENV === 'production') {

  const root = require('path').join(__dirname, 'client', 'build')
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
  })

 }

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});