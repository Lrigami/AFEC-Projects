const express = require('express');
const router = express.Router();
const todolistsController = require('../controllers/todolistsController');

router.get('/collections', todolistsController.getCollectionNames);

module.exports = router;