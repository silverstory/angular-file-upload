const express = require('express');
const upload = require('./upload');
const hrms = require('./hrms')
const sourcecode = require('./sourcecode');
const cors = require('cors');

const server = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));

server.post('/upload', upload);

server.post('/hrms', hrms);

server.post('/sourcecode', sourcecode);

server.listen(process.env.PORT, () => {
  console.log('Server started!');
});
