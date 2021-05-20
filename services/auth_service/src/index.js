const express = require('express');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const app = express();
const db = require('./models/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

process.env.PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "private.key"), 'utf-8');

db.init().then(() => {
    app.use(require('./routes'));
    app.listen(3100, () => console.log('AUTH | Listening on port 3100'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
