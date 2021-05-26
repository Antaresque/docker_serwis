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

async function addComment(req, res){
    return res.sendStatus(404);
}

async function changeComment(req, res){
    return res.sendStatus(404);
}

async function deleteComment(req, res){
    return res.sendStatus(404);
}

module.exports = {
    getComments, addComment, changeComment, deleteComment
}