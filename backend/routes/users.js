const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Getting One
  router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
  });
  
  // Creating one
  router.post('/', async (req, res) => {
    const user = new User({
        auth0Id: req.body.auth0Id,
        username: req.body.username,
        email: req.body.email,
        tasks: req.body.tasks || [], 
        profile: {
          fullName: req.body.profile?.fullName || '',
          profilePicture: req.body.profile?.profilePicture || ''
        }
    });
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Updating One
  router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
      res.user.name = req.body.name;
    }
    //change
    if (req.body.subscribedToChannel != null) {
      res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }
    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Deleting One
  router.delete('/:id', getUser, async (req, res) => {
    try {
      await res.user.remove();
      res.json({ message: 'Deleted User' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  async function getUser (req, res, next) {
    let user;
    try {
      user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find subscriber' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.user = user;
    next();
  };

module.exports = router;