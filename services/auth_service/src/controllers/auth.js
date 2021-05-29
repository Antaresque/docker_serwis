const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const axios = require('axios');
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
            return res.status(401).send("Nieprawidłowy login lub hasło");
        }

        let valid = await verifyHash(password, val.password);
        if(!valid) {
            return res.status(401).send("Nieprawidłowy login lub hasło");
        }

        const payload = { id: val.id, username: val.username, role: val.role };
        const token = jwt.sign(payload, SECRET, { algorithm: 'RS256' });
        return res.send({ token: token });
        
    }
    else
        return res.sendStatus(400).send("Brak lub nieprawidłowe dane");;    
}

async function register(req, res){
    const { username, password, email } = req.body;
    const SECRET = process.env.PRIVATE_KEY;

    const val = await Auth.findOne({ where: { username: username } });
    if(val !== null)
        return res.status(400).send("Login zajęty");
    
    const hash = await createHash(password);
    if(hash === null)
        return res.sendStatus(500);
    
    const newUser = await Auth.create({ username: username, password: hash, role: 'user' });
    const payload = { id: newUser.id, username: newUser.username, role: newUser.role };

    try {
        const reply = await axios.post(process.env.DATA_URI + `/users`, { nickname: username, email: email });
    }
    catch(err){
        await newUser.destroy();
        return res.sendStatus(500);
    }

    const token = jwt.sign(payload, SECRET, { algorithm: 'RS256' });
    return res.status(200).send({ token: token }); 
}

async function changePassword(req, res){
    const { username, password } = req.body;

    if(username && password){
        try {
            const record = await Auth.findOne({ where: { username: username } });
            if(!record)
                throw("No user in database");
            
            const id = record.id;

            const obj = { password: password };
            const status = await Auth.update(obj, {where : { username: username }})

            if(!status)
                throw("Error while changing password");
            return res.sendStatus(200);
        }
        catch(err){
            console.log(err.message);
            return res.sendStatus(500); 
        }
    }
    else return res.sendStatus(400);
}

async function remove(req, res){
    const { dataid, username } = req.body;

    if(dataid && username){
        try {
            const record = await Auth.findOne({ where: { username: username } });
            if(!record)
                throw("No user in database");
            
            const id = record.id;

            const status = await axios.delete(DATA_URI + `/users/${dataid}`, obj);
            if(!status)
                throw("Data service responded in invalid way");

            const statusAuth = await record.destroy();
            if(!statusAuth)
                throw("Error while removing User");

            return res.sendStatus(200);
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
    register,
    changePassword,
    remove
}