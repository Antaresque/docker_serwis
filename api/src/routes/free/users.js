const User = require('../../controllers/data_user');
const { isEmpty } = require('../../helper'); 

async function getUser(req, res){
    if(!parseInt(req.params.id)){ 
        res.sendStatus(400);
        return;
    }

    const id = parseInt(req.params.id);

    try {
        const data = await User.getById(id);

        if(isEmpty(data))
            res.sendStatus(404);
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

async function getUserImages(req, res){
    if(!parseInt(req.params.id)){
        res.sendStatus(400);
        return;
    }

    const limit = parseInt(req.query.limit) ? req.query.limit : 10;
    const page  = parseInt(req.query.page)  ? req.query.page  : 1;
    const count = (req.query.count === undefined) ? false : req.query.count;

    const id = parseInt(req.params.id);

    try {
        const data = await User.getUserImages(id, limit, page, count);

        if(isEmpty(data))
            res.sendStatus(404);
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
    getUser, getUserImages
}