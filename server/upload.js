const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');

module.exports = function upload(req, res) {

  const form = new IncomingForm();

  let filename;

  // form.on('file', (field, file) => {
  //   // Do something with the file
  //   // e.g. save it to the database
  //   // you can access it using file.path
  //   console.log('file', file.name);
  //   const readStream = fs.createReadStream(file.path)
  //     .pipe(fs.createWriteStream('./uploads/' + file.name));
  // });

  form.on('field', (name, value) => {
    filename = value;
  });
  form.on('file', (field, file) => {
    if ( !filename ) {
      const generated = Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15) + '.' +
      file.name.split('.').pop();
      filename = generated;
    }
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    console.log(file.name  + ' > ' + filename);
    const readStream = fs.createReadStream(file.path)
      .pipe(fs.createWriteStream('/uploads/' + filename));
  });  
  form.on('end', () => {
    res.json( { path: 'http://127.0.0.1/' + filename } );
  });
  form.parse(req);
};
