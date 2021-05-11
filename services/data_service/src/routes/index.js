const router = require('express').Router();

const { getImageById, getImages } = require('./images');

router.get('/images', getImages);
router.get('/images/:id', getImageById);


module.exports = router;