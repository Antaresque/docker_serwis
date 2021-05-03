const db = require("../../db");

module.exports = async (req, res) => {
    await db.removeItem('todo-items', req.params.id);
    res.sendStatus(200);
};
