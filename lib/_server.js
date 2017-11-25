'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = module.exports = express.Router();
const Task = require('./task.js');

const jsonParser = bodyParser.json();
///Don't think I need this but not sure yet
const urlencodedParser = bodyParser.urlencoded({ extended: false });

let tasks = {};

router.use(function(req, res, next){
  ///Something for all routes
  next();
});

router.get('/', function(req, res, next){
  res.send('Hello World');
  next();
});

///Displays all tasks
router.get('/tasks/all', (req, res, next) => {
  res.send(tasks);
  next();
});

///get task by url query
router.get('/tasks', jsonParser, (req, res, next) => {
  res.send(tasks[req.query.id]);
  next();
});

///create new task
router.post('/tasks', jsonParser, (req, res, next) => {
  let task = new Task(req.body);
  tasks[task.id] = task;
  res.send(tasks);
  next();
});

///Update task
router.put('/tasks', jsonParser, (req, res, next) => {
  //get right task by key
  let task = tasks[req.body.id];
  ///go through keys in request object and update the fields based on that
  Object.keys(req.body).forEach((key) => {
    task[key] = req.body[key];
  });
  res.send(task);
  next();
});

///Delete task
router.delete('/tasks', jsonParser, (req, res, next) => {
  delete tasks[req.query.id];
  res.send(204, 'Item deleted');
  next();
});
