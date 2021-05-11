const router = require('express').Router();

const { getAll, getOne, getComments } = require("./subroutes/images");
//const { login, register } = require("./subroutes/auth");
//const { uploadImage, addComment, setVote, undoVote } = require('./subroutes/imagesuser');
//const { updateImage, deleteImage, deleteComment } = require('./subroutes/imagesowner');

router.get("/images", getAll);
router.get("/images/:id", getOne);
router.get("/images/:id/comments", getComments);

/*
router.post("/login", login);
router.post("/register", register);
*/

/*
// need to be user
router.post('/images', uploadImage);
router.post('/images/:id/comments', addComment);
router.post('/images/:id/votes', setVote);
router.delete('/images/:id/votes', undoVote);

// need to be owner or admin
router.put('/images/:id', updateImage);
router.delete('/images/:id', deleteImage);
router.delete('/images/:id/comments', deleteComment);

*/

module.exports = router;