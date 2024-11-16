const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/:id/tasks', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.json(user.tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/:id/tasks/taskId', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const task = user.tasks.find((t) => t.id === parseInt(req.params.taskId));
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found.' });
      }
  
      res.json(task);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.post('/:id/tasks', async (req, res) => {
    const { title, description } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required.' });
    }
  
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const newTask = {
        taskId: user.tasks.length + 1, 
        title,
        description,
        streakCount: 0,
        lastCompleted: null
      };
  
      user.tasks.push(newTask);
      await user.save();
  
      res.status(201).json(newTask);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.patch('/:id/tasks/:taskId', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const task = user.tasks.find((t) => t.taskId === parseInt(req.params.taskId));
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found.' });
      }
  
      if (req.body.title != null) {
        task.title = req.body.title;
      }
  
      if (req.body.description != null) {
        task.description = req.body.description;
      }
  
      await user.save();
      res.json(task);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.delete('/:id/tasks/:taskId', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const taskIndex = user.tasks.findIndex((t) => t.taskId === parseInt(req.params.taskId));
  
      if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found.' });
      }
  
      user.tasks.splice(taskIndex, 1);
      await user.save();
  
      res.json({ message: 'Task deleted successfully.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  module.exports = router;