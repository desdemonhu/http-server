'use strict';
const express = require('express');
const app = express();
const router = require('./lib/_server.js');
const PORT = process.env.PORT || 3000;

app.use('/', router);
app.use('/tasks/*', router);

app.listen(PORT, () => {
  console.log(`Listening on port Number: ${PORT}`);
});
