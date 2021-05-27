const axios = require('axios');
const DATA_URI = process.env.DATA_SERVICE_URI;

const { handleErrors } = require('../helper');

// --------------- IMAGES --------------------
async function getHomepage(limit, page) {
    try{
        const reply = await axios.get(DATA_URI + `/images?limit=${limit}&page=${page}`);
        return reply.data;
    }
    catch(err){ handleErrors(err) }
}

async function getById(id) {
    try{
        const reply = await axios.get(DATA_URI + `/images/${id}`);
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}

async function getComments(id) {
    try{
        const reply = await axios.get(DATA_URI + `/images/${id}/comments`);
        return reply.data;    
    }
    catch(err) { handleErrors(err) }  
}

async function create(id, title, description, filename){
    try {
        const reply = await axios.post(DATA_URI + `/images`, { userid: id, title: title, description: description, address: filename });
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}

async function edit(obj) {

}

async function remove(id) {

}

module.exports = {
    getHomepage,
    getById,
    getComments,
    create, edit, remove
}