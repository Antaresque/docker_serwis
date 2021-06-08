async function getAllUsers(req, res){
    const { role } = req.payload;

    if(role !== 'admin')
        return res.sendStatus(401);
    
    
}

async function getAllComments(req, res){
    const { role } = req.payload;

    if(role !== 'admin')
        return res.sendStatus(401);

    
}

module.exports = {
    getAllUsers, getAllComments
}