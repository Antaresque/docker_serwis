const axios = require('axios');
const DATA_URI = process.env.DATA_SERVICE_URI;

const { handleErrors } = require('../helper');

// --------------- USERS --------------------
async function register(user, email){
    try{
        const reply = await axios.post(DATA_URI + `/register`, { nickname: user, email: email });
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}

async function getById(id){
    try{
        const reply = await axios.get(DATA_URI + `/users/${id}`);
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}

async function getFull(id){
    try{
        const reply = await axios.get(DATA_URI + `/users/${id}`);
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}

async function edit(obj) {

}

async function remove(id) {
}

module.exports = {
    register,
    getById, getFull,
    cedit, remove
}