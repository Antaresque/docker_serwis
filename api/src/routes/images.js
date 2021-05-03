const router = require('express').Router;

// without login
router.get('/', getImagesHomepage);
router.get('/:id', getImagesById);
router.get('/:id/comments', getComments);

router.get('/:id/file', getImageFile);

module.exports = router;