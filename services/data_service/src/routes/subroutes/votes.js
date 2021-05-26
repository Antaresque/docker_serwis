const models = require("../../models");
const VoteImage = models.VoteImage;
const VoteComment = models.VoteComment;

async function addImageVote(req, res){
    const { id } = req.params;
    const { userid } = req.body;

    if(!id || !userid)
        return res.sendStatus(400);

    const vote = { imgid: id, userid: userid };

    try {
        const voteObj = await VoteImage.findOne({ where: vote });
        if(voteObj)
            return res.sendStatus(400).send("głos już istnieje");
        
        const newVote = await VoteImage.create(vote);
        if(!newVote)
            throw("Błąd przy dodawaniu głosu");

        res.sendStatus(200);
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
}

async function removeImageVote(req, res){
    const { id } = req.params;
    const { userid } = req.body;

    if(!id || !userid)
        return res.sendStatus(400);

    try {
        const voteObj = await VoteImage.findOne({ where: vote });
        if(!voteObj)
            return res.sendStatus(400).send("głos nie istnieje");
        
        const newVote = await VoteImage.destroy({ where: vote });
        if(!newVote)
            throw("Błąd przy usuwaniu głosu");

        res.sendStatus(200);
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
}

async function addCommentVote(req, res){
    const { id } = req.params;
    const { userid } = req.body;

    if(!id || !userid)
        return res.sendStatus(400);

    const vote = { commentid: id, userid: userid };

    try {
        const voteObj = await VoteComment.findOne({ where: vote });
        if(voteObj)
            return res.sendStatus(400).send("głos już istnieje");
        
        const newVote = await VoteComment.create(vote);
        if(!newVote)
            throw("Błąd przy dodawaniu głosu");

        res.sendStatus(200);
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
}

async function removeCommentVote(req, res){
    const { id } = req.params;
    const { userid } = req.body;

    if(!id || !userid)
        return res.sendStatus(400);

    const vote = { commentid: id, userid: userid };

    try {
        const voteObj = await VoteComment.findOne({ where: vote });
        if(!voteObj)
            return res.sendStatus(400).send("głos nie istnieje");
        
        const newVote = await VoteComment.destroy({ where: vote });
        if(!newVote)
            throw("Błąd przy usuwaniu głosu");

        res.sendStatus(200);
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
}

module.exports = {
    addImageVote, removeImageVote, addCommentVote, removeCommentVote
}