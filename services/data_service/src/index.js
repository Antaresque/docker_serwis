const bodyParser = require('body-parser');
const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const db = require('./db');
const router = require('./routes');

app.use(bodyparser.json());
app.use(express.static(__dirname + '/static'));
app.use(router);

db.init().then(() => {
    app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
