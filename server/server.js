//create server
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
app.use(express.static('server/public'));





//start server
app.listen(PORT, () => {
    console.log ('server is running')
  })