const express = require('express');
require('dotenv').config();

const app = express();
const db = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.init().then(() => {
    app.use(require('./routes'));
    app.listen(3000, () => console.log('AUTH | Listening on port 3100'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
