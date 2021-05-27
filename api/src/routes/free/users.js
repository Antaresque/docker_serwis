const User = require('../../controllers/data_user');
const { isEmpty } = require('../../helper'); 

async function getUser(req, res){
    if(!parseInt(req.params.id)){ 
        res.sendStatus(400);
        return;
    }

    const id = parseInt(req.params.id);

    try {
        const data = await User.getById(id);

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

module.exports = {
    getUser
}