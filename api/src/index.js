const express = require('express');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');

require('dotenv').config();
const app = express();

// routes
const { freeRoutes, userRoutes, ownerRoutes } = require('./routes');

app.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 20 * 1024 * 1024 * 1024 //20MB max filesize
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', freeRoutes);
app.use('/', userRoutes);
app.use('/', ownerRoutes);

process.env.PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, 'public.key'), 'utf-8');

app.listen(4000, () => console.log('API | Listening on port 4000'));