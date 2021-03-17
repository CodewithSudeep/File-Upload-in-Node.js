const multer = require('multer');
const express = require('express');
const UploadRouter = express.Router();

// @dev uploads/ may not work on all OS (I'm using Windows 10 Home Edition) so you can use file path to navigate to the folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage,
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