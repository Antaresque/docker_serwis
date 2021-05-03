const router = require('express').Router();

const { getImagesHomepage, getImagesById, getComments } = require('../controllers/data');

// without login
router.get('/', getImagesHomepage);
router.get('/:id', getImagesById);
router.get('/:id/comments', getComments);

//router.get('/:id/file', getImageFile);

module.exports = router;