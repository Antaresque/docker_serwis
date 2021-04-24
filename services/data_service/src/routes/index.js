const router = require('express').Router();

import getItems from './item/getItems';
import addItem from './item/addItem';
import updateItem from './item/updateItem';
import deleteItem from './item/deleteItem';

router.get('/items', getItems);
router.post('/items', addItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

module.exports = router;