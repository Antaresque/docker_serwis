const router = require('express').Router();

const { getImagesHomepage, getImagesById, getComments } = require('../controllers/data');
const { isEmpty } = require('../helper');

/**
 * get data about X images
 * @method GET
 * @param limit - how many images, default: 10
 * @param page - which page (offset), default: 1
 * @route /images/
 */
async function getAll (req, res) {
    const limit = parseInt(req.query.limit) ? req.query.limit : 10;
    const page  = parseInt(req.query.page)  ? req.query.page  : 1;

    try {
        const data = await getImagesHomepage(limit, page);

        if(isEmpty(data))
            res.sendStatus(404);
        else
            res.send(data);
    }
    catch(err){
        console.error(`${err.config.url}: ${err.message}`);
        res.sendStatus(500);
    }
};

/**
 * get image by ID
 * @method GET
 * @param id - ID of the image
 * @route /images/:id/ 
 */ 
async function getOne (req, res) {
    if(!parseInt(req.params.id)){ 
        res.sendStatus(400);
        return;
    }

    const id = parseInt(req.params.id);

    try {
        const data = await getImagesById(id);

        if(isEmpty(data))
            res.sendStatus(404);
        else
            res.send(data);
    }
    catch(err){
        console.log(err);
        console.error(`${err.config.url}: ${err.message}`);
        res.sendStatus(500);
    }
}

/**
 * get comments of image
 * @method GET
 * @param id - ID of the image
 * @route /images/:id/comments
 */
async function getComments (req, res) {
    if(!parseInt(req.params.id)){
        res.sendStatus(400);
        return;
    }

    const id = parseInt(req.params.id);

    try {
        const data = await getComments(id);

        if(isEmpty(data))
            res.sendStatus(404);
        else
            res.send(data);
    }
    catch(err){
        console.error(`${err.config.url}: ${err.message}`);
        res.sendStatus(500);
    }
}

/**
 * get file (probably not) (?) (not sure if needed)
 * @method GET
 * @param name - name of the image
 * @route /images/file/:name
 */
/*router.get('/file/:name', async (req, res) => {
    const name = req.params.name;

    try {
        const data = await getImageFile(name);

        if(isEmpty(data))
            res.sendStatus(404);
        else
            res.send(data);
    }
    catch(err){
        console.error(`${err.config.url}: ${err.message}`);
        res.sendStatus(500);
    }
});*/

module.exports = {
    getOne,
    getAll,
    getComments
}