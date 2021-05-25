const express = require('express');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const app = express();

// routes
const { freeRoutes, userRoutes, ownerRoutes } = require('./routes');
const { userAuthValidator, ownerAuthValidator } = require('./controllers/authMiddle');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

userRoutes.use(userAuthValidator);
ownerRoutes.use(ownerAuthValidator);

app.use('/', freeRoutes);
app.use('/', userRoutes);
app.use('/', ownerRoutes);

process.env.PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, 'public.key'), 'utf-8');

app.listen(4000, () => console.log('API | Listening on port 4000'));