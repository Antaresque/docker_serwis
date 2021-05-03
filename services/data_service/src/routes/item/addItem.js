const db = require("../../db");
const uuid = require('uuid/v4');

module.exports = async (req, res) => {
    const item = {
        id: uuid(),
        name: req.body.name,
        completed: false,
    };

    await db.insertItem('todo-items', item);
    res.send(item);
};
