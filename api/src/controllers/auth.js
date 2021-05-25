const axios = require('axios');
const AUTH_URI = process.env.AUTH_SERVICE_URI;

async function login(user, pass){
    try {
        const reply = await axios.post(AUTH_URI + `/login`, { username: user, password: pass }); 
        return reply.data;
    }
    catch(err){
        if(err.response) 
            throw(err.response.status);
        else 
            throw(500);
    }

}

async function register(user, pass, email){
    try {
        const reply = await axios.post(AUTH_URI + `/register`, { username: user, password: pass, email: email });
        return reply.data;
    }
    catch(err){
        if(err.response) 
            throw(err.response.status);
        else 
            throw(500);
    }
}

module.exports = {
    loginAuth: login, 
    registerAuth: register,
}