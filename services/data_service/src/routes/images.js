const models = require("../db");
const Image = models.Image;
const Comment = models.Comment;

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

async function getComments(req, res){
    const id = req.params.id;

    const options = {
        where: { imgid: id }
    }
    const items = await Comment.findAll(options);
}

module.exports = {
    getImageById,
    getImages,
    getComments
}