const axios = require('axios');
const STORE_URI = process.env.STORE_SERVICE_URI;


async function getImageFile(name) {
    const reply = await axios.get(STORE_URI + `/images/${name}`);

    return reply;
}

module.exports = {
    getImageFile
}