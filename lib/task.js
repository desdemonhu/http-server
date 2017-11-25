'use strict';
const uuid = require('uuid/v1');

module.exports = class Task {
  constructor(request) {
    this.id = uuid();
    this.title = request.title;
    this.task = request.task;
    this.done = request.done;
  }

  ///Methods
};
