async function uploadImage(req, res) {
    console.log(req.file);
    res.send(req.file.name);
    res.end();
}

module.exports = {
    uploadImage
}