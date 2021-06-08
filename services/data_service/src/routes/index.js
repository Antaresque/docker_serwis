const router = require('express').Router();

const { getImageById, getImages, 
        addImage, changeImage, deleteImage } = require('./subroutes/images');
const { getAllComments, getComments, addComment, getCommentById, changeComment, deleteComment } = require('./subroutes/comments')
const { getImageVote, getCommentVote, addImageVote, removeImageVote, addCommentVote, removeCommentVote } = require('./subroutes/votes');
const { getAllUsers, getUserById, getUserFullById, registerUser, changeUser, removeUser } = require('./subroutes/users');

router.get('/images', getImages);

router.get('/images/:id', getImageById);
router.post('/images', addImage);
router.put('/images/:id', changeImage);
router.delete('/images/:id', deleteImage); 

router.get('/images/:id/comments', getComments);
router.post('/images/:id/comments', addComment);
router.get('/comments/:id', getCommentById);
router.put('/comments/:id', changeComment);
router.delete('/comments/:id', deleteComment);

router.get('/images/:id/votes', getImageVote);
router.post('/images/:id/votes', addImageVote);
router.delete('/images/:id/votes', removeImageVote);

router.get('/comments/', getAllComments);
router.get('/comments/:id/votes', getCommentVote);
router.post('/comments/:id/votes', addCommentVote);
router.delete('/comments/:id/votes', removeCommentVote);

router.get('/users/', getAllUsers);
router.get('/users/:id', getUserById);
router.get('/users/:id/full', getUserFullById);
router.post('/users', registerUser);
router.put('/users/:id', changeUser);
router.delete('/users/:id', removeUser);

module.exports = router;