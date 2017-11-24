'use strict';
const express = require('express');
const parser = require('body-parser');
const router = module.exports = express.Router();

router.use(function(req, res, next){
  ///Something for all routes
  next();
});

router.get('/', function(req, res, next){
  res.send('Hello World');
  next();
});
