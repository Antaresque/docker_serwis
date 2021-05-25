const { loginAuth, registerAuth } = require('../../controllers/auth');
async function login(req, res) {
    const { user, pass } = req.body;

    if(user && pass){
        try {
            let token = await loginAuth(user, pass); 
            if(token.err)
                return res.sendStatus(token.status);

            res.send({ token: token });
        }
        catch(err){
            console.log(err.message);
            return res.sendStatus(500);
        }
    }
    else return res.sendStatus(400);
}

async function register(req, res){
    const { user, pass, email } = req.body;
    //console.log('registerdebug:' + req.body.user);

    if(user && pass && email){
        try {
            let token = await registerAuth(user, pass, email);
            if(token.err)
                return res.sendStatus(token.status);

            return res.send({ token: token }); 
        }
        catch(err){
            console.log(err.message);
            return res.sendStatus(500);
        }
    }
    else return res.sendStatus(400);
}

module.exports = {
    login,
    register
}