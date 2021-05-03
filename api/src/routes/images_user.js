const router = require('express').Router;

router.use(authValidator);

// need login 
router.post('', uploadImage);
router.put('/:id', updateImage);
router.delete('/:id', deleteImage);

router.post('/:id/comments', addComment);
router.delete('/:id/comments', deleteComment);

router.post('/:id/votes', setVote);
router.delete('/:id/votes', undoVote);

module.exports = router;