const express = require("express");
const bodyParser = require("body-parser");
const busboyBodyParser = require('busboy-body-parser');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('./middleware/jwt');
const errorHandler = require('./middleware/error-handler');

const app = express();
global.__root   = __dirname + '/'; 

// all middlewares 

// log all requests to access.log
app.use(logger('dev', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a', encoding:'utf-8' })
}))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//parse multipart/form-data    
app.use(busboyBodyParser({ limit: '5mb' }));

app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// global error handler
app.use(errorHandler);

// error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to designhill node application." });
});

//require("./routes/user.routes.js")(app); 
require("./routes/product.routes.js")(app); 

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});