const router = require('express').Router;

router.use(authValidator);

/*

// need to be user
router.post('', uploadImage);
router.post('/:id/comments', addComment);
router.post('/:id/votes', setVote);
router.delete('/:id/votes', undoVote);

// need to be owner or admin
router.put('/:id', updateImage);
router.delete('/:id', deleteImage);
router.delete('/:id/comments', deleteComment);

module.exports = router;

*/