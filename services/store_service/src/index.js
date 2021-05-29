const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
const uuid = require('uuid');

const publicPath = path.join(__dirname, 'public');

const uploadAv = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(publicPath, 'avatar'));
    },
    filename: function (req, file, cb) {
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
});

const uploadIm = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(publicPath, 'image'));
    },
    filename: function (req, file, cb) {
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
});

const { uploadImage } = require('./upload');

app.use("/public/image", express.static(path.join(__dirname, 'public/image')));
app.use("/public/avatar", express.static(path.join(__dirname, 'public/avatar')));
app.post("/upload/avatar", multer({ storage: uploadAv }).single('file'), uploadImage);
app.post("/upload/image", multer({ storage: uploadIm }).single('file'), uploadImage);

app.listen(5000, () => {
    console.log("Listening on port 5000");
    console.log(path.join(__dirname, 'public'));
})