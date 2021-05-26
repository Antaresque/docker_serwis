const jwt = require('jsonwebtoken');

async function oAV(req, res, next){
    let authToken = req.headers.authorization;
    const PUBLIC_KEY = process.env.PUBLIC_KEY;

    if(authToken) {
        const token = authToken.split(' ')[1]; // Bearer token
        
        jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }, (err, payload) => {
            if(err)
                return res.sendStatus(403);
            
            req.payload = payload;

            if(req.payload.role === undefined)
                return res.sendStatus(401);

            next();
        });
    } 
    else return res.sendStatus(401);
}

async function getPayload(req){
    let authToken = req.headers.authorization;
    const PUBLIC_KEY = process.env.PUBLIC_KEY;

    if(authToken) {
        const token = authToken.split(' ')[1]; // Bearer token
    
        jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }, (err, payload) => {
            if(err)
                return {};
            
            return payload;
        });
        
    }
    else return {};
    
}

module.exports = {
    userAuthValidator: oAV,
    getPayload
}