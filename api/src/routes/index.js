const free = require('express').Router();
const user = require('express').Router();
const owner = require('express').Router();

const { getAll, getOne, getComments } = require("./subroutes/images");
const { login, register } = require("./subroutes/auth");
const { userAuthValidator } = require('../controllers/authMiddle');
//const { uploadImage, addComment, setVote, undoVote } = require('./subroutes/imagesuser');
//const { updateImage, deleteImage, deleteComment } = require('./subroutes/imagesowner');

free.get("/images", getAll);
free.get("/images/:id", getOne);
free.get("/images/:id/comments", getComments);

free.post("/login", login);
free.post("/register", register);

user.get("/testAuth", userAuthValidator, (req, res) => {
    res.send({ payload: req.payload });
});

/*
// need to be authorized user
user.post('/images', uploadImage);
user.post('/images/:id/comments', addComment);
user.post('/images/:id/votes', setVote);
user.delete('/images/:id/votes', undoVote);

// need to be owner or admin
owner.put('/images/:id', updateImage);
owner.delete('/images/:id', deleteImage);
owner.delete('/images/:id/comments', deleteComment);

*/

module.exports = {
    freeRoutes: free,
    userRoutes: user,
    ownerRoutes: owner
}