const free = require('express').Router();
const user = require('express').Router();
const owner = require('express').Router();

const { userAuthValidator } = require('../controllers/authMiddle');

const { getAll, getOne, getComments } = require("./free/images");
const { login, register } = require("./free/auth");
const { getUser } = require('./free/users');

const { addImage, addComment } = require('./user/images');
const { setImageVote, undoImageVote, setCommentVote, undoCommentVote } = require('./user/votes'); 
const { uploadImage, uploadAvatar } = require('./user/upload');

const { updateImage, deleteImage } = require('./owner/images');
const { updateComment, deleteComment } = require('./owner/comments');
const { updateUser, deleteUser, getUserFull } = require('./owner/users');

// --- FREE ROUTES ---
 
free.get("/images", getAll);
free.get("/images/:id", getOne);
free.get("/images/:id/comments", getComments);

free.post("/login", login);
free.post("/register", register);

free.get('/users/:id', getUser);

// --- USER ROUTES ---

user.get("/testAuth", userAuthValidator, (req, res) => {
    res.send({ payload: req.payload });
});

user.post('/images/:id/votes', userAuthValidator, setImageVote);
user.delete('/images/:id/votes', userAuthValidator, undoImageVote);
user.post('/comments/:id/votes', userAuthValidator, setCommentVote);
user.delete('/comments/:id/votes', userAuthValidator, undoCommentVote);

user.post('/images', userAuthValidator, addImage);
user.post('/images/:id/comments', userAuthValidator, addComment);

user.post('/images/upload', userAuthValidator, uploadImage);
user.post('/users/upload', userAuthValidator, uploadAvatar);

// --- OWNER ROUTES ---

// need to be owner or admin
owner.get('/users/:id/full', userAuthValidator, getUserFull)
owner.put('/images/:id', userAuthValidator, updateImage);
owner.delete('/images/:id', userAuthValidator, deleteImage);
owner.put('/images/:id/comments', userAuthValidator, updateComment);
owner.delete('/images/:id/comments', userAuthValidator, deleteComment);
owner.put('/users/:id', userAuthValidator, updateUser);
owner.delete('/users/:id', userAuthValidator, deleteUser);


module.exports = {
    freeRoutes: free,
    userRoutes: user,
    ownerRoutes: owner
}