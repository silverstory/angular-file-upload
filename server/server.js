const express = require('express');
const upload = require('./upload');
const hrms = require('./hrms');
const locator = require('./hrms/locator');
const accomplishment = require('./hrms/accomplishment');
const photos = require('./hrms/photos');
const application = require('./hrms/application');
const learnings = require('./hrms/learnings');
const leave = require('./hrms/leave');
const onboarding = require('./hrms/onboarding');
const performance = require('./hrms/performance');
const rme = require('./hrms/rme');

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

server.post('/locator', locator);

server.post('/accomplishment', accomplishment);

server.post('/photos', photos);

server.post('/application', application);

server.post('/learnings', learnings);

server.post('/leave', leave);

server.post('/onboarding', onboarding);

server.post('/performance', performance);

server.post('/rme', rme);

server.post('/sourcecode', sourcecode);

server.listen(process.env.PORT, () => {
  console.log('Server started!');
});
