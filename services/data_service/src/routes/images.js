const models = require("../db");
const Image = models.Image;

async function getImageById(req, res) {
    const id = req.params.id;
    const items = await Image.findByPk(id);
    res.send(items);
}

async function getImages(req, res){
    const limit = parseInt(req.query.limit);
    const offset = limit * ( parseInt(req.query.page) - 1 );

    const options = { 
        order: [['crdate', 'DESC']], 
        limit: limit, 
        offset: offset
    }
    
    const items = await Image.findAll(options);
    res.send(items);
}

module.exports = {
    getImageById,
    getImages
}