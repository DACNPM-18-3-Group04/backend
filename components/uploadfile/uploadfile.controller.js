

var appRoot = require('app-root-path'); 
const path = require('path');
const fs = require('fs');


const handleError = (err, res) => {
  res.status(500).contentType('text/plain').end('Oops! Something went wrong!');
};

const handleUploadfile = (req, res) => {

  const tempPath = req.file.path;
  const date = new Date();
  const targetPath = path.join(`${appRoot}`, `./public/assets/${date.getTime()}.png`);

  if (path.extname(req.file.originalname).toLowerCase() === '.png') {
    console.log('datnc', tempPath, 'datnc', targetPath);
    fs.rename(tempPath, targetPath, (err) => {
      if (err) 
      {
          console.error(err)
      return handleError(err, res);
      }

      res.status(200).contentType('text/plain').end('File uploaded!');
    });
  } else {
    fs.unlink(tempPath, (err) => {
      if (err) return handleError(err, res);

      res
        .status(403)
        .contentType('text/plain')
        .end('Only .png files are allowed!');
    });
  }
};
module.exports = { handleUploadfile };
