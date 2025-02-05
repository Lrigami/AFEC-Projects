// Routes
const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');

router.post('/tasks', taskController.createNewTask);
router.get('/tasks', taskController.readAllTasks);
router.get('/task/:id', taskController.readOneTask);
router.put('/task/:id', taskController.updateTask);
router.delete('/task/:id', taskController.deleteTask);

module.exports = router;