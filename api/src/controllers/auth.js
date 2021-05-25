const axios = require('axios');
const AUTH_URI = process.env.AUTH_SERVICE_URI;

async function login(user, pass){
    try {
        const reply = await axios.post(AUTH_URI + `/login`, { username: user, password: pass }); 
        return { err: false, data: reply.data };
    }
    catch(err){
        if(err.response) {
            switch(err.response.status){
                case 400:
                case 401:
                case 500:
                    return { err: true, status: err.response.status };
                default:
                    throw(err.response.status);
            }
        }
        else throw(500);
    }

}

async function register(user, pass, email){
    try {
        const reply = await axios.post(AUTH_URI + `/register`, { username: user, password: pass, email: email });
        return { err: false, data: reply.data };
    }
    catch(err){
        if(err.response) {
            switch(err.response.status){
                case 400:
                case 401:
                case 500:
                    return { err: true, status: err.response.status };
                default:
                    throw(err.response.status);
            }
        }
        else throw(500);
    }
}

module.exports = {
    loginAuth: login, 
    registerAuth: register,
}