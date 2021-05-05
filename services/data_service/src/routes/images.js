const models = require("../db");
const Image = models.Image;

async function getImageById(req, res) {
    const id = req.params.id;
    const items = await Image.findByPk(id);
    res.send(items);
}

async function getImages(req, res){
    const limit = req.params.limit;
    const items = await Image.findAll();
    res.send(items);
}

module.exports = {
    getImageById,
    getImages
}