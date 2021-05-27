const axios = require('axios');
const { response } = require('express');
const { handleErrors } = require('../helper');
const AUTH_URI = process.env.AUTH_SERVICE_URI;

async function login(user, pass){
    try {
        const reply = await axios.post(AUTH_URI + `/login`, { username: user, password: pass }); 
        return reply.data;
    }
    catch(err){
        if(err.response){
            if(err.response.status == 400 || err.response.status == 401) { // złe dane
                throw({ message: err.response.data, status: err.response.status })
            }
            else throw({ message: "", status: err.response.status });
        } 
        else 
            throw({ message: "", status: 500 });
    }

}

async function register(user, pass, email){
    try {
        const reply = await axios.post(AUTH_URI + `/register`, { username: user, password: pass, email: email });
        return reply.data;
    }
    catch(err){
        if(err.response){
            if(err.response.status == 400) { // złe dane
                throw({ message: err.response.data, status: err.response.status })
            }
            else throw({ message: "", status: err.response.status });
        } 
        else 
            throw({ message: "", status: 500 });
    }
}

async function changePassword(username, password){
    try {
        const reply = await axios.put(AUTH_URI + `/users`, { username: username, password: password });
        return reply.data;
    }
    catch(err){ handleErrors(err) }
}

async function remove(username, id) {
    try {
        const reply = await axios.remove(AUTH_URI + `/users`, { username: username, dataid: id });
        return reply.data;
    }
    catch(err){ handleErrors(err) }
}


module.exports = {
    loginAuth: login, 
    registerAuth: register,
    changePassword: changePassword,
    remove
}