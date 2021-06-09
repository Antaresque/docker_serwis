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

async function getImageByUser(req, res){
    const limit = parseInt(req.query.limit);
    // offset = ilosc obrazkow na stronie * numer strony
    const offset = limit * ( parseInt(req.query.page) - 1 );
    const countP = req.query.count;
    const id = req.params.id;

    const options = { 
        order: [['createdAt', 'DESC']], 
        limit: limit, 
        offset: offset,
        where: { userid: id }
    }

    //console.log(count);
    try {
        if(countP === 'true') {
            const { count, rows } = await ImageView.findAndCountAll(options);
            res.send({ data: rows, totalCount: count });
        }
        else if(countP === 'false') {
            const data = await ImageView.findAll(options);
            res.send(data);
        }
        else{
            res.sendStatus(400);
        }
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
    const countP = req.query.count;

    const options = { 
        order: [['createdAt', 'DESC']], 
        limit: limit, 
        offset: offset
    }

    //console.log(count);
    try {
        if(countP === 'true') {
            const { count, rows } = await ImageView.findAndCountAll(options);
            res.send({ data: rows, totalCount: count });
        }
        else if(countP === 'false') {
            const data = await ImageView.findAll(options);
            res.send(data);
        }
        else{
            res.sendStatus(400);
        }
    }
    catch(err) {
        console.log(err.message);
        res.sendStatus(500);
    }
}


async function addImage(req, res){
    const { userid, title, description, address } = req.body;

    if(userid && title && description && address){
        const newImage = {
            userid: userid,
            title: title,
            description: description,
            address: address
        }

        try {
            const record = await Image.create(newImage);
            res.send(record);
        }
        catch(err){
            console.log(err.message);
            res.sendStatus(500);
        }
    
        
    }
    else return res.sendStatus(400);
}

async function changeImage(req, res){
    const { id } = req.params;
    if(!id || id === undefined)
        return res.sendStatus(400);

    const { title, description } = req.body;
    
    let obj = {};
    if(title)
        obj.title = title;
    if(description)
        obj.description = description;

    if(obj === {})
        return res.sendStatus(400);

    try {
        const records = await Image.update(obj, { where: { id: id } });
        if(!records)
            throw("No updated image");
        
        const updatedImage = await Image.findByPk(id);
        if(!updatedImage)
            throw("No updated image");

        res.send(updatedImage);
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(500); 
    }
}

async function deleteImage(req, res){
    const { id } = req.params;
    if(!id)
        return res.sendStatus(400);

    try {
        const destroyedImage = await Image.findByPk(id);
        if(!destroyedImage)
            return res.status(400).send("No image with this ID");

        const records = await Image.destroy({ where: { id: id } });
        if(!records)
            throw("No records removed");

        res.send(destroyedImage);
    }
    catch(err) {
        console.log(err.message);
        res.sendStatus(500);
    }
}

module.exports = {
    getImageById,
    getImages,
    addImage, 
    changeImage, 
    deleteImage,
    getImageByUser
}