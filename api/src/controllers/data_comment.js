const axios = require('axios');
const DATA_URI = process.env.DATA_SERVICE_URI;

const { handleErrors } = require('../helper');

// --------------- COMMENTS --------------------
async function getAllAdmin(limit, page) {
    try {
        const reply = await axios.get(DATA_URI + `/comments?limit=${limit}&page=${page}`);
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}

async function getById(id){
    try {
        const reply = await axios.get(DATA_URI + `/comments/${id}`);
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}

async function create(imgid, userid, comment){
    try {
        const reply = await axios.post(DATA_URI + `/images/${imgid}/comments`, { userid: userid, comment: comment });
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}

async function edit(id, obj) {
    try {
        const reply = await axios.put(DATA_URI + `/comments/${id}`, obj);
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}

async function remove(id) {
    try {
        const reply = await axios.delete(DATA_URI + `/comments/${id}`);
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}

module.exports = {
    create, edit, remove, getById, getAllAdmin
}