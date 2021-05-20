const axios = require('axios');
const jwt = require('jsonwebtoken');
const AUTH_URI = process.env.AUTH_SERVICE_URI;

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
    } else {
        res.sendStatus(401);
    }
}

module.exports = {
    userAuthValidator: oAV,
    ownerAuthValidator: oAV,
}