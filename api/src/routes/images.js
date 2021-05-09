const router = require('express').Router();

const { getImagesHomepage, getImagesById, getComments } = require('../controllers/data');

// without login
router.get('/', async (req, res) => {
    const data = await getImagesHomepage(req, res, 10);
    res.send(data);
});

router.get('/:id', getImagesById);
router.get('/:id/comments', getComments);

//router.get('/:id/file', getImageFile);

module.exports = router;