const Comment = require('../../controllers/data_comment');

async function updateComment(req, res){
    const { id: token_user, role } = req.payload;
    const { comment } = req.body;
    const id = parseInt(req.params.id);

    if(!id)
        return res.sendStatus(400);

    try {
        if(role !== 'admin'){
            const img = await Comment.getById(id);
            if(isEmpty(img))
                return res.sendStatus(400);
            
            if(img.userid != token_user)
                return res.sendStatus(401);
        }
        
        const data = await Comment.edit(id, { comment: comment });

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
async function deleteComment(req, res){
    const { id: token_user, role } = req.payload;
    const id = parseInt(req.params.id);

    if(!id)
        return res.sendStatus(400);

    try {
        if(role !== 'admin') {
            const obj = await Comment.getById(id);
            if(isEmpty(obj))
                return res.sendStatus(400);
            
            if(obj.userid != token_user)
                return res.sendStatus(401);
        }
        
        const data = await Comment.remove(id);
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
    updateComment, deleteComment
}