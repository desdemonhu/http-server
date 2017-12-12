'use strict';
const express = require('express');

const jsonParser = require('body-parser').json();
const router = module.exports = express.Router();
const Task = require('./data-controller.js');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

///Database connection
mongoose.connect('mongodb://localhost/tasklist', {useMongoClient: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function(){
  console.log('Connection established!');
});

///Routes
router.use(function(req, res, next){
  ///Something for all routes
  next();
});

router.get('/', function(req, res, next){
  res.send('Hello World');
  next();
});

///Displays all tasks
router.get('/tasks/all', (req, res) => {
  Task.find()
    .then(tasks => res.send(tasks))
    .catch(err => next(err));
});

///get task by url query
router.get('/tasks', (req, res, next) => {
  Task.findById([req.query.id])
    .then(task => res.send(task))
    .catch(err => next(err));
});

///create new task
router.post('/tasks', jsonParser, (req, res, next) => {
  let task = new Task(req.body);
  task.save()
    .then(task => res.send(task))
    .catch(err => next(err));
});

///Update task
router.put('/tasks', jsonParser, (req, res, next) => {
  Task.findById([req.query.id])
    .then(task => {
      Object.keys(req.body).forEach((key) => {
        task[key] = req.body[key];
      });
      return task;
    })
      .then(task => task.save()
                        .then(task => res.send(task)))
    .catch(err => next(err));
});

///Delete task
router.delete('/tasks', jsonParser, (req, res, next) => {
  Task.findOneAndRemove({_id: [req.query.id]})
  .then(res.send('Task deleted'))
  .catch(err => next(err));
});
