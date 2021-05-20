const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Auth = require("../models/db").Auth;

async function createHash(plainPassword){
    const saltRounds = 10;

    try {
        let hash = await bcrypt.hash(plainPassword, saltRounds);
        return hash;
    }
    catch(err) {
        console.error(err.message);
        return null;
    }
}

async function verifyHash(pass, hash){
    try {
        let result = await bcrypt.compare(pass, hash);
        return result;
    }
    catch(err) {
        console.error(err.message);
        return false;
    }
}

async function login(req, res){
    const { username, password } = req.body;
    const SECRET = process.env.PRIVATE_KEY;

    if(username && password) {
        const val = await Auth.findOne({ where: { username: username } });
        if(val === null) {
            return res.sendStatus(401);
        }

        let valid = await verifyHash(password, val.password);
        if(!valid) {
            return res.sendStatus(401);
        }

        const payload = { id: val.id, username: val.username, role: val.role };
        const token = jwt.sign(payload, SECRET, { algorithm: 'RS256' });
        return res.send({ valid: true, token: token });
        
    }
    else
        return res.sendStatus(400);    
}

async function register(req, res){
    const { username, password } = req.body;
    const SECRET = process.env.PRIVATE_KEY;

    const val = await Auth.findOne({ where: { username: username } });
    if(val !== null){
        res.sendStatus(400);
        return;
    }
    
    const hash = await createHash(password);
    if(hash === null){
        res.sendStatus(500);
        return; 
    }

    const newUser = await Auth.create({ username: username, password: hash, role: 'user' });
    const payload = { id: newUser.id, username: newUser.username, role: newUser.role };
    const token = jwt.sign(payload, SECRET, { algorithm: 'RS256' });
    res.status(200).send({ valid: true, token: token }); 
}

module.exports = {
    login,
    register
}