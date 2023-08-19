
const express = require('express');
const taskService = require('../services/task.service');
const router = express.Router();

// routes
router.post('/register', taskRegister);
router.delete('/delete', taskDelete);

module.exports = router;


// Register a new task 
function taskRegister(req, res, next) {
    taskService.taskRegister(req.body)
        .then(data =>res.json(data))
        .catch(err => next(err));
}

// Register a new task 
function taskDelete(req, res, next) {
    taskService.taskDelete(req.body)
        .then(data =>res.json(data))
        .catch(err => next(err));
}
