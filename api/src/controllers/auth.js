const axios = require('axios');
const AUTH_URI = process.env.AUTH_SERVICE_URI;

async function login(user, pass){
    const reply = await axios.post(AUTH_URI + `/login`, { username: user, password: pass });
    if(reply.status !== 200 && reply.status !== 400 && reply.status !== 402)
        throw(reply.statusText);

    return reply.data;
}

async function register(user, pass){
    const reply = await axios.post(AUTH_URI + `/register`, { username: user, password: pass });
    if(reply.status !== 200)
        throw(reply.statusText);

    return reply.data;
}

module.exports = {
    loginAuth: login, 
    registerAuth: register,
}