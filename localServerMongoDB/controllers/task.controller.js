
const express = require('express');
const taskService = require('../services/task.service');
const { taskRegisterValidation } = require('../validators/task.validator');
const router = express.Router();

// routes
router.get('/getAll', taskGetAll);
router.post('/register', taskRegisterValidation, taskRegister);
router.delete('/delete', taskDelete);

module.exports = router;


// Get all tasks 
function taskGetAll(req, res, next) {
    taskService.taskGetAll(req.body)
        .then(data =>res.json(data))
        .catch(err => next(err));
}

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
