'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
  title: String,
  dueDate: Date,
  task: String,
  done: Boolean,
});

module.exports = mongoose.model('Task', TaskSchema);
