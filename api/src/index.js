const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();

const app = express();
const router = require('./routes');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));
app.use(router);

db.init().then(() => {
    app.listen(4000, () => console.log('API | Listening on port 4000'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});