const router = require('express').Router();

const { login, register, changePassword, remove} = require('./controllers/auth');

router.post('/login', login);
router.post('/register', register);
router.put('/users', changePassword)
router.delete('/users', remove);

module.exports = router;