const axios = require('axios');
const STORE_URI = process.env.STORE_SERVICE_URI;
const { handleErrors } = require('../helper');
const FormData = require('form-data');

async function getImageFile(name) {
    const reply = await axios.get(STORE_URI + `/images/${name}`);

    return reply;
}

async function upload(file, type){
    if(type !== 'avatar' && type !== 'image')
        throw({status: 400, message: "Wrong type of image"});

    const fd = new FormData();
    fd.append('file', file.buffer, file.originalname);

    let config = {
        headers: {
            'Content-Type' : `multipart/form-data; boundary=${fd._boundary}`
        }
    }

    try {
        const status = await axios.post(STORE_URI + `/upload/${type}`, fd, config);
        return status.data.filename;
    }
    catch(err) { handleErrors(err) }
}

module.exports = {
    getImageFile, upload
}