const router = require('express').Router();

const imageRoutes = require("./subroutes/images");
//const authRoutes = require("./subroutes/auth");
//const imageUserRoutes = require('./subroutes/imagesuser');
//const imageOwnerRoutes = require('./subroutes/imagesowner');

router.get("/images", imageRoutes.getAll);
router.get("/images/:id", imageRoutes.getOne);
router.get("/images/:id/comments", imageRoutes.getComments);

/*
router.post("/login", authRoutes.login);
router.post("/register", authRoutes.register);
*/

/*
// need to be user
router.post('/images', uploadImage);
router.post('/images/:id/comments', addComment);
router.post('/images/:id/votes', setVote);
router.delete('/images/:id/votes', undoVote);

// need to be owner or admin
router.put('/images/:id', updateImage);
router.delete('/images/:id', deleteImage);
router.delete('/images/:id/comments', deleteComment);

*/


module.exports = router;