// Routes
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/tasks', taskController.createNewTask);
router.get('/tasks', taskController.readAllTasks);
router.get('/tasks/:id', taskController.readOneTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;