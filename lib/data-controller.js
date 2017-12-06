'use strict';

const Promise = require('bluebird');
const prom = Promise.promisify;
const promAll = Promise.promisifyAll;
const MongoClient = promAll(require('mongodb').MongoClient);
const connection = MongoClient.connectAsync('mongodb://localhost:27017/tasklist')
  .then(db => {
    const collection = promAll(db.collection('tasks'));
    collection.insertAsync({task: 'Here is our first task'})
    .then(console.log)
    .then(db.close.bind(db))
    .catch(console.log);
    return db;
  });

let addNote = module.exports = function(req){
  return req;
};
