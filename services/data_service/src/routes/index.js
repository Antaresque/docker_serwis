const router = require('express').Router();

const { getImageById, getImages, getComments } = require('./images');

router.get('/images', getImages);
router.get('/images/:id', getImageById);
router.get('/images/:id/comments', getComments);

module.exports = router;