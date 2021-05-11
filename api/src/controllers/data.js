const axios = require('axios');
const DATA_URI = process.env.DATA_SERVICE_URI;

// funkcja pobierająca obrazki
async function getImagesHomepage(limit, page) {
    const reply = await axios.get(DATA_URI + `/images?limit=${limit}&page=${page}`);
    if(reply.status !== 200)
        throw(reply.statusText);

    return reply.data;
}

async function getImagesById(id) {
    const reply = await axios.get(DATA_URI + `/images/${id}`);

    if(reply.status !== 200 && reply.status !== 404)
        throw(reply.statusText);

    return reply.data;
}

async function getComments(id) {
    const reply = await axios.get(DATA_URI + `/images/${id}/comments`);
        
    if(reply.status !== 200 && reply.status !== 404)
        throw(reply.statusText);

    return reply.data;
}


module.exports = {
    getImagesHomepage, 
    getImagesById, 
    getComments
}