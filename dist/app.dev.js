"use strict";

require('dotenv').config();

var express = require('express');

var bodyParser = require('body-parser');

var app = express(); // Middleware

app.use(bodyParser.json()); // Import routes

app.use('/api/users', userRoutes); // Start server

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});