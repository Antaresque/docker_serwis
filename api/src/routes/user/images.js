const Image = require("../../controllers/data_image");
const Comment = require("../../controllers/data_comment");
const { isEmpty } = require('../../helper');

async function addImage(req, res){
    const { id } = req.payload;
    const { title, description, filename } = req.body;

    if(!title)
        return res.status(400).send("Brak tytułu obrazka");
    if(!description)
        return res.status(400).send("Brak opisu obrazka");
    if(!filename)
        return res.status(400).send("Brak nazwy pliku");

    try {
        const data = await Image.create(id, title, description, filename);

        if(isEmpty(data))
            res.sendStatus(500);
        else
            res.send(data);
    }
    catch(err){
        console.error(`${err.config.url}: ${err.message}`);
        res.sendStatus(500);
    }
}
async function addComment(req, res){
    return res.sendStatus(404);
}

module.exports = {
    addImage, addComment
}