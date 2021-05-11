const express = require('express');
require('dotenv').config();
const app = express();

// routes
const router = require('./routes');
//const images_user = require('./routes/images_user');
//const auth = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.listen(4000, () => console.log('API | Listening on port 4000'));