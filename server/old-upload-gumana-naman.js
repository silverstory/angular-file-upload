const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');

module.exports = function upload(req, res) {

  const form = new IncomingForm();

  // form.on('file', (field, file) => {
  //   // Do something with the file
  //   // e.g. save it to the database
  //   // you can access it using file.path
  //   console.log('file', file.name);
  //   const readStream = fs.createReadStream(file.path)
  //     .pipe(fs.createWriteStream('./uploads/' + file.name));
  // });

  // gumana naman
  form.on('field', (name, value) => {

    form.on('file', (field, file) => {
      
      if (value === '-') {
        const generated = Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) + '.' +
        file.name.split('.').pop();
        value = generated;
      }

      // Do something with the file
      // e.g. save it to the database
      // you can access it using file.path
      console.log(file.name  + ' > ' + value);

      const readStream = fs.createReadStream(file.path)
        .pipe(fs.createWriteStream('./uploads/' + value));
    });

  });

  form.on('end', () => {
    res.json();
  });
  form.parse(req);
};
