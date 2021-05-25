const { loginAuth, registerAuth } = require('../../controllers/auth');
async function login(req, res){
    console.log(req.body);
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
            res.sendStatus(500);
        }
    }
    else {
        res.sendStatus(400);
    }
}

async function register(req, res){
    const { user, pass, email } = req.body;
    //console.log('registerdebug:' + req.body.user);

    if(user && pass && email){
        try {
            let token = await registerAuth(user, pass, email);
            if(token !== undefined)
                res.send(token);
            else
                res.sendStatus(500);
            
        }
        catch(err){
            console.log(err.message);
            res.sendStatus(500);
        }
    }
    else {
        res.sendStatus(400);
    }
}

module.exports = {
    login,
    register
}