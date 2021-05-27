const models = require("../../models");
const User = models.User;
const UserView = models.UserView;

async function getUserById(req, res) {
    const { id } = req.params;
    if(!id)
        return res.sendStatus(400);

    try {
        const userObj = await UserView.findByPk(id, {attributes: ['id', 'nickname', 'images', 'comments', 'createdAt']});
        if(!userObj)
            return res.sendStatus(400).send("No user by this ID");

        res.send(userObj);
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
}

async function getUserFullById(req, res){
    const { id } = req.params;
    if(!id)
        return res.sendStatus(400);

    try {
        const userObj = await UserView.findByPk(id);
        if(!userObj)
            return res.sendStatus(400).send("No user by this ID");

        res.send(userObj);
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
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
    const { id } = req.params;
    if(!id || id === undefined)
        return res.sendStatus(400);

    const { email } = req.body;
    if(email) {
        const newObj = { email: email };

        try {
            const records = await User.update(newObj, { where: { id: id } });
            if(!records)
                throw("No updated record");
            
            const updatedImage = await User.findByPk(id);
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

async function removeUser(req, res){
    const { id } = req.params;
    if(!id)
        return res.sendStatus(400);

    try {
        const destroyedUser = await User.findByPk(id);
        if(!destroyedUser)
            return res.status(400).send("No user with this ID");

        const records = await User.destroy({ where: { id: id } });
        if(!records)
            throw("No records removed");

        res.send(destroyedUser);
    }
    catch(err) {
        console.log(err.message);
        res.sendStatus(500);
    }
}

module.exports = {
    getUserById, registerUser, changeUser, removeUser
}