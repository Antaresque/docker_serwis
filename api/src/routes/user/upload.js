const { upload } = require('../../controllers/store');
const { isEmpty } = require('../../helper');

async function uploadImage(req, res){
    if(!req.file)
        return res.status(400).send("Invalid file");

    try {
        const status = await upload(req.file, 'image');
        if(isEmpty(status))
            return res.sendStatus(500);
        else
            return res.sendStatus(200); 
    }
    catch(err){
        console.log(err.message);
        if(res.status)
            return res.status(err.status).send(err.message);
        else return res.sendStatus(500);
    }
    
}
async function uploadAvatar(req, res){
    if(!req.file)
        return res.status(400).send("Invalid file");

    try {
        const status = await upload(req.file, 'avatar');
        if(isEmpty(status))
            return res.sendStatus(500);
        else
            return res.sendStatus(200);
    }
    catch(err){
        console.log(err.message);
        if(res.status)
            return res.status(err.status).send(err.message);
        else return res.sendStatus(500);
    }
}

module.exports = {
    uploadImage, uploadAvatar
}