// Imports
const express = require('express');
const cors    = require('cors');
const expressValidator = require("express-validator");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

// API Routes
const routes = require('./src/routes');

// DB
require('./src/db');

// Express Middleware + allow cross-origin resource sharing (CORS)
const app     = express();
app.use(cors());

// Data parser - used to parse post data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

// Routes
app.use("/api/", routes);

// start server
// -----------------------
var server_port = process.env.YOUR_PORT || process.env.PORT || 8080;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});


