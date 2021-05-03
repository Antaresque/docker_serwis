const axios = require('axios');
const URI = process.env.DATA_SERVICE_URI;

async function getImagesHomepage(req, res) {
    const limit = req.params.limit | 10;

    try {
        const reply = await axios.get(URI + `/images?limit=${limit}`);
        if(reply.status !== 200)
            throw(reply.statusText);

        res.send(reply.data);
    }
    catch(err) { 
        console.log(err);
        res.sendStatus(500);
    }
}

async function getImagesById(req, res) {
    const id = req.params.id;

    try {
        const reply = await axios.get(URI + `/images/${id}`);

        if(reply.status === 404) 
            res.status(404).send({})
        else if(reply.status !== 200) 
            throw(reply.statusText);
        else
            res.send(reply.data);
    }
    catch(err) { 
        console.log(err);
        res.sendStatus(500);
    }
}

async function getComments(req, res) {
    const id = req.params.id;

    try {
        const reply = await axios.get(URI + `/images/${id}/comments`);
        
        if(reply.status === 404) 
            res.status(404).send({})
        else if(reply.status !== 200) 
            throw(reply.statusText);
        else
            res.send(reply.data);
    }
    catch(err) { 
        console.log(err);
        res.sendStatus(500);
    }    
}


module.exports = {
    getImagesHomepage, 
    getImagesById, 
    getComments
}