const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();

const app = express();
const db = require('./db');
const router = require('./routes');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));
app.use(router);

const items = require("./db/items");

db.init().then(() => {
    items.forEach(item => db.storeItem(item));
    app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
