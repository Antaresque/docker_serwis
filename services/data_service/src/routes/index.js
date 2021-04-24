const router = require('express').Router();

const getItems = require('./item/getItems');
const addItem = require('./item/addItem');
const updateItem = require('./item/updateItem');
const deleteItem = require('./item/deleteItem');

router.get('/items', getItems);
router.post('/items', addItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

module.exports = router;