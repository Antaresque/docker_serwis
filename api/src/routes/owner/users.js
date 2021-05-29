const User = require("../../controllers/data_user");
const AuthUser = require('../../controllers/auth');
const { isEmpty } = require('../../helper');

async function updateUser(req, res){
    const { id: token_user, role } = req.payload;
    const { pass, email } = req.body;
    const id = parseInt(req.params.id);

    if(!id)
        return res.sendStatus(400);

    try {
        if(role !== 'admin' && id != token_user)
            return res.sendStatus(401);

        const obj = await User.getById(id);
        if(isEmpty(obj))
            return res.sendStatus(500);

        const username = obj.username;
        
        if(pass){
            const data = await AuthUser.changePassword(username, pass);

            if(isEmpty(data))
                return res.sendStatus(500);
        }

        if(email){
            const data = await User.edit(id, { email: email });

            if(isEmpty(data))
                return res.sendStatus(500);
        }

        res.sendStatus(200);
        
    }
    catch(err){
        console.log(err.message);
        if(res.status)
            return res.status(err.status).send(err.message);
        else return res.sendStatus(500);
    }
}
async function deleteUser(req, res){
    const { id: token_user, role } = req.payload;
    const id = parseInt(req.params.id);

    if(!id)
        return res.sendStatus(400);

    try {
        if(role !== 'admin' && id != token_user)
            return res.sendStatus(401);

        const obj = await User.getById(id);
        if(isEmpty(obj))
            return res.sendStatus(500);

        const username = obj.username;
        const data = await AuthUser.remove(username, id);

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

async function getUserFull(req, res){
    const { id: token_user, role } = req.payload;
    const id = parseInt(req.params.id);

    if(!id)
        return res.sendStatus(400);

    if(role !== 'admin' && token_user != id)
        return res.sendStatus(401);

    try {
        const data = await User.getFull(id);

        if(isEmpty(data))
            res.sendStatus(404);
        else
            res.send(data);;
    }
    catch(err){
        console.log(err.message);
        if(res.status)
            return res.status(err.status).send(err.message);
        else return res.sendStatus(500);
    }
}

module.exports = {
    updateUser, deleteUser, getUserFull
}