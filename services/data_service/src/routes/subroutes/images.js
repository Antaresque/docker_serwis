const models = require("../../models");
const Image = models.Image;
const ImageView = models.ImageView;

async function getImageById(req, res) {
    const id = req.params.id;

    try {
        const items = await ImageView.findByPk(id);
        res.send(items);
    }
    catch(err) {
        console.log(err.message);
        res.sendStatus(500);
    }
}

async function getImages(req, res){
    const limit = parseInt(req.query.limit);
    // offset = ilosc obrazkow na stronie * numer strony
    const offset = limit * ( parseInt(req.query.page) - 1 );

    const options = { 
        order: [['createdAt', 'DESC']], 
        limit: limit, 
        offset: offset
    }

    try {
        const items = await ImageView.findAll(options);
        res.send(items);
    }
    catch(err) {
        console.log(err.message);
        res.sendStatus(500);
    }
}

async function addImage(req, res){
    return res.sendStatus(404);
}

async function changeImage(req, res){
    return res.sendStatus(404);
}

async function deleteImage(req, res){
    return res.sendStatus(404);
}

module.exports = {
    getImageById,
    getImages,
    addImage, 
    changeImage, 
    deleteImage
}