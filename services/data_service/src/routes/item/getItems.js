const db = require("../../db");

module.exports = async (req, res) => {
    const items = await db.getItems('todo-items', 10);
    res.send(items);
};
