const axios = require('axios');
const DATA_URI = process.env.DATA_SERVICE_URI;

const { handleErrors } = require('../helper');

// --------------- COMMENTS --------------------
async function create(userid, comment){
    try {
       
    }
    catch(err) { handleErrors(err) }
}

async function edit(obj) {

}

async function remove(id) {
}

module.exports = {
    create, edit, remove
}