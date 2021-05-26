const models = require("../../models");
const User = models.User;

async function getUserById(req, res) {
    return res.sendStatus(404);
}

async function registerUser(req, res) {
    const { nickname, email } = req.body;

    if(nickname && email){
        const status = await User.create({ nickname: nickname, email: email });
        if(status !== null)
            return res.send(status);
        else
            return res.sendStatus(500);
    }
    else 
        return res.sendStatus(400);
    
}

async function changeUser(req, res){
    return res.sendStatus(404);
}

async function removeUser(req, res){
    return res.sendStatus(404);
}

module.exports = {
    getUserById, registerUser, changeUser, removeUser
}