const User = require("../../controllers/data_user");

async function updateUser(req, res){
    return res.sendStatus(404);
}
async function deleteUser(req, res){
    return res.sendStatus(404);
}

async function getUserFull(req, res){
    if(!parseInt(req.params.id)){ 
        res.sendStatus(400);
        return;
    }

    const id = parseInt(req.params.id);

    try {
        const data = await User.getUserFull(id);

        if(isEmpty(data))
            res.sendStatus(404);
        else
            res.send(data);
    }
    catch(err){
        console.error(`${err.config.url}: ${err.message}`);
        res.sendStatus(500);
    }
}

module.exports = {
    updateUser, deleteUser, getUserFull
}