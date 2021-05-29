const Image = require("../../controllers/data_image");
const Comment = require("../../controllers/data_comment");
const { upload } = require('../../controllers/store');
const { isEmpty } = require('../../helper');

async function addImage(req, res){
    const { id: token_user } = req.payload;
    const { title, description } = req.body;

    if(!title)
        return res.status(400).send("Brak tytułu obrazka");
    if(!description)
        return res.status(400).send("Brak opisu obrazka");
    if(!req.file)
        return res.status(400).send("Brak pliku");

    try {
        const filename = await upload(req.file, 'image');
        if(!filename)
            return res.sendStatus(500);
        
        const data = await Image.create(token_user, title, description, filename);

        if(isEmpty(data))
            res.sendStatus(500);
        else
            res.send(data);
    }
    catch(err){
        console.log(err.message);
        if(res.status)
            return res.status(err.status).send(err.message);
        else return res.sendStatus(500);
    }
}
async function addComment(req, res){
    const { id: token_user } = req.payload;
    const { comment } = req.body;
    const { id: imgid } = req.params;

    if(!comment || !imgid)
        return res.status(400).send("Brak treści");

    try {
        const data = await Comment.create(imgid, token_user, comment);

        if(isEmpty(data))
            res.sendStatus(500);
        else
            res.send(data);
    }
    catch(err){
        console.log(err.message);
        if(res.status)
            return res.status(err.status).send(err.message);
        else return res.sendStatus(500);
    }
}

module.exports = {
    addImage, addComment
}