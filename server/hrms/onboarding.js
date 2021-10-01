const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');

module.exports = function onboarding(req, res) {

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
  form.on('file', async (field, file) => {
    if (!filename) {
      const generated = Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) + '.' +
        file.name.split('.').pop();
      filename = generated;
    }
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path

    // add version literal to the filename
    try {
    if (fs.existsSync(`/uploads/hrms/onboarding/${filename}`)) {

      // file exists remove file extension
      const x = filename.replace(/\.[^/.]+$/, "");
      // // remove file extension
      // const y = filename.replace(/\.[^/.]+$/, "");
      // // get version number
      // // wait filename doesn't have -v yet, should be filename from find files by regex
      // const x = y.split('-v').pop();
      // // increment version number
      // let z = +x;
      // z++;
      // // take highest version number from loop
      // let version = z.toString();
      // if (isNaN(version)) {
      //   version = 1;
      // }

      // generate new version digest
      const v = Math.random().toString(36).substring(2, 15);
      // rename file with new version
      const oldPath = `/uploads/hrms/onboarding/${filename}`;
      const newPath = `/uploads/hrms/onboarding/${x}-v${v}.${filename.split('.').pop()}`;
      console.log(oldPath + ' > ' + newPath);
      // remove from august 2020 commit
      // to fix bug on not retaining original file
      // fs.rename(oldPath, newPath, (err) => {
      fs.rename(oldPath, oldPath, (err) => {
        // handle error in here
        // console.error(err)
      })
    }
    } catch (err) {
      console.error(err);
    }
    console.log(file.name + ' > ' + filename);
    const readStream = fs.createReadStream(file.path)
      .pipe(fs.createWriteStream('/uploads/hrms/onboarding/' + filename));
  });
  form.on('end', () => {
    res.json({
      path: `http://${ process.env.HOST }/hrms/onboarding/${ filename }`
    });
  });
  form.parse(req);
};
