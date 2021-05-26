const { loginAuth, registerAuth } = require('../../controllers/auth');

async function login(req, res) {
    const { user, pass } = req.body;

    if(user && pass){
        try {
            let data = await loginAuth(user, pass); 
            return res.send(data);
        }
        catch(err){
            return res.status(err.status).send(err.message);
        }
    }
    else return res.status(400).send("Brak lub nieprawidłowe dane");
}

async function register(req, res){
    const { user, pass, email } = req.body;
    //console.log('registerdebug:' + req.body.user);

    if(user && pass && email){
        try {
            let data = await registerAuth(user, pass, email);
            return res.send(data); 
        }
        catch(err){
            return res.status(err.status).send(err.message);
        }
    }
    else return res.status(400).send("Brak lub nieprawidłowe dane");
}

module.exports = {
    login,
    register
}