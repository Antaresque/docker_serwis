const db = require("../db");

async function getImageById(req, res) {
    const id = req.params.id;
    const items = await db.getItem('images', id);
    res.send(items);
}

async function getImages(req, res){
    const limit = req.params.limit;
    const items = await db.getItems('images', limit);
    res.send(items);
}

module.exports = {
    getImageById,
    getImages
}