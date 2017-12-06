'use strict';

const Promise = require('bluebird');
const prom = Promise.promisify;
const promAll = Promise.promisifyAll;
const MongoClient = promAll(require('mongodb').MongoClient);


let addNote = module.exports = function(req){
  const connection = MongoClient.connectAsync('mongodb://localhost:27017/tasklist')
    .then(db => {
      console.log(db);
      const collection = promAll(db.collection('tasks'));
      collection.insertAsync(req)
      .then(console.log)
      .then(db.close.bind(db))
      .catch(console.log);
      return db;
    });
};
