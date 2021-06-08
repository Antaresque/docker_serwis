const axios = require('axios');
const DATA_URI = process.env.DATA_SERVICE_URI;

const { handleErrors } = require('../helper');

// --------------- USERS --------------------
async function getAllAdmin(limit, page) {
    try {
        const reply = await axios.get(DATA_URI + `/users?limit=${limit}&page=${page}`);
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}

async function getUserImages(id){
    try {
        const reply = await axios.get(DATA_URI + `/users/${id}/images`);
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}

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
        const reply = await axios.get(DATA_URI + `/users/${id}/full`);
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}

async function edit(id, obj) {
    try {
        const reply = await axios.put(DATA_URI + `/users/${id}`, obj);
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}

module.exports = {
    register,
    getById, getFull, getAllAdmin,
    edit, getUserImages
}