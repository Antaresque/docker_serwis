const router = require('express').Router;

router.use(authValidator);

/*

// need to be user
router.post('', uploadImage);               // no check
router.post('/:id/comments', addComment);   // no check
router.post('/:id/votes', setVote);         // no 
router.delete('/:id/votes', undoVote);      // no

// need to be owner or admin
router.put('/:id', updateImage);                // need to check if payload.user == image.owner OR payload.role == admin
router.delete('/:id', deleteImage);             // need to check if payload.user == image.owner OR payload.role == admin
router.delete('/:id/comments', deleteComment);  // need to check if payload.user == image.owner OR payload.role == admin

module.exports = router;

*/