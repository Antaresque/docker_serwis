const Comment = require('../../controllers/data_comment');
const User = require('../../controllers/data_user');
const { isEmpty } = require('../../helper');

async function getAllUsers(req, res){
    const { role } = req.payload;
    let { limit, page } = req.params;

    if(role !== 'admin')
        return res.sendStatus(401);
    
    if(!limit)
        limit = 10;
    if(!page)
        page = 1;

    try {
        const data = await User.getAllAdmin(limit, page);

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

async function getAllComments(req, res){
    const { role } = req.payload;
    let { limit, page } = req.params;

    if(role !== 'admin')
        return res.sendStatus(401);

    if(!limit)
        limit = 10;
    if(!page)
        page = 1;
    
    try {
        const data = await Comment.getAllAdmin(limit, page);

        if(isEmpty(data))
            res.sendStatus(404);
        else
            res.send(data);
    }
    catch(err) {
        console.log(err.message);
        if(res.status)
            return res.status(err.status).send(err.message);
        else return res.sendStatus(500);
    }
}

module.exports = {
    getAllUsers, getAllComments
}