const Vote = require("../../controllers/data_vote");

async function setImageVote(req, res){
    const { id: token_user } = req.payload;
    const { id: imgid } = req.params;

    if(!token_user)
        return res.status(401);

    if(!imgid)
        return res.status(400).send("Brak id");

    try {
        const data = await Vote.addForImage(imgid, token_user);

        return res.send(data);
    }
    catch(err){
        console.log(err.message);
        if(res.status)
            return res.status(err.status).send(err.message);
        else return res.sendStatus(500);
    }
}
async function undoImageVote(req, res){
    const { id: token_user } = req.payload;
    const { id: imgid } = req.params;

    if(!token_user)
        return res.status(401);

    if(!imgid)
        return res.status(400).send("Brak id");

    try {
        const data = await Vote.removeForImage(imgid, token_user);

        return res.send(data);
    }
    catch(err){
        console.log(err.message);
        if(res.status)
            return res.status(err.status).send(err.message);
        else return res.sendStatus(500);
    }
}

async function setCommentVote(req, res){
    const { id: token_user } = req.payload;
    const { id: cid } = req.params;

    if(!token_user)
        return res.status(401);

    if(!cid)
        return res.status(400).send("Brak id");

    try {
        const data = await Vote.addForComment(cid, token_user);

        return res.send(data);
    }
    catch(err){
        console.log(err.message);
        if(res.status)
            return res.status(err.status).send(err.message);
        else return res.sendStatus(500);
    }
}
async function undoCommentVote(req, res){
    const { id: token_user } = req.payload;
    const { id: cid } = req.params;

    if(!token_user)
        return res.status(401);

    if(!cid)
        return res.status(400).send("Brak id");

    try {
        const data = await Vote.removeForComment(cid, token_user);

        return res.send(data);
    }
    catch(err){
        console.log(err.message);
        if(res.status)
            return res.status(err.status).send(err.message);
        else return res.sendStatus(500);
    }
}


module.exports = {
    setImageVote, undoImageVote, setCommentVote, undoCommentVote
}