const express = require('express');
const path = require('path');
const app = express();

const { findImage, uploadImage } = require('./upload');

app.use("/public", express.static(path.join(__dirname, 'public')));
app.post("/upload", uploadImage);

app.listen(5000, () => {
    console.log("Listening on port 5000");
    console.log(path.join(__dirname, 'public'));
})