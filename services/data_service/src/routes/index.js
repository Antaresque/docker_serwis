const router = require('express').Router();

const { getImageById, getImages, getComments } = require('./images');
const { registerUser } = require('./users');

router.get('/images', getImages);
router.get('/images/:id', getImageById);
router.get('/images/:id/comments', getComments);

router.post('/register', registerUser)

module.exports = router;