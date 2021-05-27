const User = require("../../controllers/data_user");

async function updateUser(req, res){
    return res.sendStatus(404);
}
async function deleteUser(req, res){
    return res.sendStatus(404);
}

// TODO: walidacja tokenu
async function getUserFull(req, res){
    const { id } = req.payload;

    if(!parseInt(req.params.id))
        return res.sendStatus(400);

    const reqId = parseInt(req.params.id);

    if(reqId != id)
        return res.sendStatus(401);

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