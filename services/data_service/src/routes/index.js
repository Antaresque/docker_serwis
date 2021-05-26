const router = require('express').Router();

const { getImageById, getImages, 
        addImage, changeImage, deleteImage } = require('./subroutes/images');
const { getComments, addComment, changeComment, deleteComment } = require('./subroutes/comments')
const { addImageVote, removeImageVote, addCommentVote, removeCommentVote } = require('./subroutes/votes');
const { getUserById, registerUser, changeUser, removeUser } = require('./subroutes/users');

router.get('/images', getImages);

router.get('/images/:id', getImageById);
router.post('/images', addImage);
router.put('/images/:id', changeImage);
router.delete('/images/:id', deleteImage); 

router.get('/images/:id/comments', getComments);
router.post('/images/:id/comments', addComment);
router.put('/comments/:id', changeComment);
router.delete('/comments/:id', deleteComment);

router.post('/images/:id/votes', addImageVote);
router.delete('/images/:id/votes', removeImageVote);

router.post('/comments/:id/votes', addCommentVote);
router.delete('/comments/:id/votes', removeCommentVote);

router.get('/users/:id', getUserById);
router.post('/users', registerUser);
router.put('/users/:id', changeUser);
router.delete('/users/:id', removeUser);

module.exports = router;