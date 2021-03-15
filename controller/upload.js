const multer = require('multer');
const express = require('express');
const UploadRouter = express.Router();

// @dev uploads/ may not work on all OS (I'm using Windows 10 Home Edition) so you can use file path to navigate to the folder
const upload = multer({ dest: 'uploads/' });

// @dev uploadItem is a key for value(item), also if you want to upload multiple file then use upload.multiple()
UploadRouter.post('/upload', upload.single('uploadItem'), (req, res) => {
    res.json({ msg: req.file });
 });

module.exports = UploadRouter;