'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = module.exports = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/tasklist', {useMongoClient: true});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function(){
  console.log('Connection established!');
  let taskSchema = mongoose.Schema({
    title: String,
    dueDate: Date,
    task: String,
    done: Boolean,
  });
  let Task = mongoose.model('Task', taskSchema);

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
    Task.find(function(err, tasks){
      console.log(tasks);
      res.send(tasks);
    });
  });

  ///get task by url query
  router.get('/tasks', jsonParser, (req, res, next) => {
    res.send(tasks[req.query.id]);
    next();
  });

  ///create new task
  router.post('/tasks', jsonParser, (req, res, next) => {
    let task = new Task(req.body);
    task.save(function(err, task){
      if(err) return console.error(err);
    });
    res.send(task);
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

});

let tasks = {};
