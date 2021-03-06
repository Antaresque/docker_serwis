const axios = require('axios');
const DATA_URI = process.env.DATA_SERVICE_URI;

const { handleErrors } = require('../helper');

async function getImage(id, userid){
    try {
        const reply = await axios.get(DATA_URI + `/images/${id}/votes?userid=${userid}`);
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}
async function getComment(id, userid){
    try {
        const reply = await axios.get(DATA_URI + `/comments/${id}/votes?userid=${userid}`);
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}

async function addForImage(id, userid){
    try {
        const reply = await axios.post(DATA_URI + `/images/${id}/votes`, { userid: userid });
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}
async function removeForImage(id, userid){
    try {
        const reply = await axios.delete(DATA_URI + `/images/${id}/votes`, { data: { userid: userid } });
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}
async function addForComment(id, userid){
    try {
        const reply = await axios.post(DATA_URI + `/comments/${id}/votes`, { userid: userid });
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}
async function removeForComment(id, userid){
    try {
        const reply = await axios.delete(DATA_URI + `/comments/${id}/votes`, { data: { userid: userid } });
        return reply.data;
    }
    catch(err) { handleErrors(err) }
}

// --------------- VOTES ----------------------
module.exports = {
    getComment, getImage, addForImage, removeForImage, addForComment, removeForComment
}