const models = require("../../models");
const Comment = models.Comment;
const CommentView = models.CommentView;
const User = models.User;

async function getComments(req, res){
    const id = req.params.id;

    const options = {
        where: { imgid: id },
        include: [{
            model: User,
            attributes: ['nickname']
        }]
    }

    try {
        const items = await CommentView.findAll(options);
        res.send(items);
    }
    catch(err) {
        console.log(err.message);
        res.sendStatus(500);
    }
}

async function getCommentById(req, res){
    const id = req.params.id;

    const options = {
        where: { id: id },
        include: [{
            model: User,
            attributes: ['nickname']
        }]
    }
    
    try {
        const items = await CommentView.findOne(options);
        res.send(items);
    }
    catch(err) {
        console.log(err.message);
        res.sendStatus(500);
    }
}

async function addComment(req, res){
    const { id } = req.params;
    if(!id || id === undefined)
        return res.sendStatus(400);

    const { userid, comment } = req.body;

    if(userid && comment){
        const newObject = {
            userid: userid,
            imgid: id,
            comment: comment
        }

        try {
            const record = await Comment.create(newObject);
            if(!record)
                throw("No records created");

            res.send(record);
        }
        catch(err){
            console.log(err.message);
            res.sendStatus(500);
        }
    
        
    }
    else return res.sendStatus(400);
}

async function changeComment(req, res){
    const { cid } = req.params;
    if(!cid || cid === undefined)
        return res.sendStatus(400);

    const { comment } = req.body;
    if(comment) {
        const newObj = { comment: comment };

        try {
            const records = await Comment.update(newObj, { where: { id: cid } });
            if(!records)
                throw("No updated record");
            
            const updatedImage = await Comment.findByPk(cid);
            if(!updatedImage)
                throw("No updated record");
    
            res.send(updatedImage);
        }
        catch(err){
            console.log(err.message);
            res.sendStatus(500); 
        }
        
    }
    else return res.sendStatus(400);
}

async function deleteComment(req, res){
    const { cid } = req.params;
    if(!cid)
        return res.sendStatus(400);

    try {
        const destroyedImage = await Comment.findByPk(cid);
        if(!destroyedImage)
            return res.status(400).send("No comment with this ID");

        const records = await Comment.destroy({ where: { id: cid } });
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
    getComments, getCommentById, addComment, changeComment, deleteComment
}