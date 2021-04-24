const db = require('../db');

module.exports = async (req, res) => {
    const items = await db.getItems();
    res.send(items);
};
