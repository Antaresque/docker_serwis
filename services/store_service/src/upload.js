async function uploadImage(req, res) {
    console.log(`Uploaded: ${req.file.filename}`);
    res.send({filename: req.file.filename});
}

module.exports = {
    uploadImage
}