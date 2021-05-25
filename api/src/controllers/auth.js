const axios = require('axios');
const AUTH_URI = process.env.AUTH_SERVICE_URI;

async function login(user, pass){
    const reply = await axios.post(AUTH_URI + `/login`, { username: user, password: pass });

    if(reply.status === 400 || reply.status === 401)
        return { err: true, status: reply.status };
    if(reply.status !== 200)
        throw(reply.statusText);
    
    return { err: false, data: reply.data };
}

async function register(user, pass, email){
    const reply = await axios.post(AUTH_URI + `/register`, { username: user, password: pass, email: email });
    if(reply.status !== 200)
        throw(reply.statusText);

    return reply.data;
}

module.exports = {
    loginAuth: login, 
    registerAuth: register,
}