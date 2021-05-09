const express = require('express');
require('dotenv').config();
const app = express();

// routes
const images = require('./routes/images');
//const images_user = require('./routes/images_user');
//const auth = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', images);

//app.use('/v1/images', images_user);
//app.use('/v1/auth', auth);

app.listen(4000, () => console.log('API | Listening on port 4000'));