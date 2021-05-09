const express = require('express');
require('dotenv').config();

const app = express();
const db = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//const items = require("./db/items");

db.init().then(() => {
    const router = require('./routes');
    app.use(router);
    app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
