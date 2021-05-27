const Image = require('../../controllers/data_image');

async function updateImage(req, res){
    const { id: token_user, role } = req.payload;
    const { title, description } = req.body;
    const id = parseInt(req.params.id);

    if(!id)
        return res.sendStatus(400);

    try {
        if(role !== 'admin'){
            const img = await Image.getById(id);
            if(isEmpty(img))
                return res.sendStatus(400);
            
            if(img.userid != token_user)
                return res.sendStatus(401);
        }
        
        const data = await Image.edit(id, { title: title, description: description });

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
async function deleteImage(req, res){
    const { id: token_user, role } = req.payload;
    const id = parseInt(req.params.id);

    if(!id)
        return res.sendStatus(400);

    try {
        if(role !== 'admin'){
            const img = await Image.getById(id);
            if(isEmpty(img))
                return res.sendStatus(400);
            
            if(img.userid != token_user)
                return res.sendStatus(401);
        }
        
        const data = await Image.remove(id);

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
    updateImage, deleteImage
}