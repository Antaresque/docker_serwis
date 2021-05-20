const models = require("../db");
const User = models.User;

async function registerUser(req, res) {
    const { nickname, email } = req.body;

    if(nickname && email){
        const status = await User.create({ nickname: nickname, email: email });
        if(status !== null)
            return res.sendStatus(200);
        else
            return res.sendStatus(500);
    }
    else 
        return res.sendStatus(400);
    
}

module.exports = {
    registerUser
}