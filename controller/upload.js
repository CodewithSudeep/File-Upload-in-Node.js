const multer = require('multer');
const express = require('express');
const UploadRouter = express.Router();
const sha1 = require('sha1')

// @dev uploads/ may not work on all OS (I'm using Windows 10 Home Edition) so you can use file path to navigate to the folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        // @dev sha1 is used to hash the fileName to mitigate FMA(File Metadata Attack)
        const fileName = sha1(file.originalname.toLowerCase().split(' ').join('-'))
        const fileMimeType = file.originalname.toLowerCase().split('.');

        const fName = fileName + '.' + fileMimeType[fileMimeType.length - 1]
        cb(null, fName)
    }
});

// @dev file of maximum 10 mb size can be uploaded to mitigate the file size attack
const maxFileSize = 10 * 1000 * 1000;

var upload = multer({
    storage: storage,
    limits: { fileSize: maxFileSize },
    // @dev instead of OR operation in if conditionals,  we can use switch operation too.
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// @dev uploadItem is a key for value(item), also if you want to upload multiple file then use upload.multiple()
UploadRouter.post('/upload', upload.single('uploadItem'), (req, res) => {
    res.json({ msg: req.file });
});

module.exports = UploadRouter;